const crypto = require("crypto");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const File = require("../models/File");

// ======================================
// GET ALL FILES
// ======================================
const getFiles = async (req, res) => {
  try {
    const files = await File.find({
      uploadedBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(files);

  } catch (error) {
    console.error("GET FILES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch files.",
    });
  }
};

// ======================================
// UPLOAD FILE
// ======================================
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }
    console.log(req.file);

    const extension = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    const file = await File.create({
      originalName: req.file.originalname,
      publicId: req.file.filename,
      fileUrl: req.file.path,
      fileType: extension,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.id,
      shareId: crypto.randomUUID(),
    });

    res.status(201).json(file);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Upload failed.",
    });
  }
};
// file preview//

const previewFile = async (req, res) => {
  try {

    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }


    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }


    // Only allow image and video preview
    if (
  !file.mimeType?.startsWith("image/") &&
  !file.mimeType?.startsWith("video/")
) {

      return res.status(400).json({
        message: "Preview not available for this file type.",
      });

    }


   const resourceType =
  file.mimeType?.startsWith("video/")
    ? "video"
    : "image";


    const signedUrl = cloudinary.url(file.publicId, {

      resource_type: resourceType,

      type: "upload",

      sign_url: true,

    });


    console.log("SIGNED PREVIEW URL:", signedUrl);


    return res.status(200).json({
      url: signedUrl,
      expiresIn: "2 minutes",
    });


  } catch (error) {

    console.error("PREVIEW ERROR:", error);

    res.status(500).json({
      message: "Preview failed.",
    });

  }
};

    


// ======================================
// ======================================
// ======================================
// DOWNLOAD FILE (Proxy Download)
// ======================================
const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }

    // Only owner can download
  // Access check removed because preview redirect cannot send JWT token

    // Increase download count
    file.downloadCount += 1;
    await file.save();

    // Download file from Cloudinary
let resourceType = "raw";

if (file.mimeType?.startsWith("image/")) {
  resourceType = "image";
} else if (file.mimeType?.startsWith("video/")) {
  resourceType = "video";
}

const signedUrl = cloudinary.url(file.publicId, {
  resource_type: resourceType,
  type:
    resourceType === "raw"
      ? "authenticated"
      : "upload",
  sign_url: true,
});

const response = await axios({
  method: "GET",
  url: signedUrl,
  responseType: "stream",
});

    // Set correct headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.originalName}"`
    );

    res.setHeader(
      "Content-Type",
      file.mimeType || "application/octet-stream"
    );

    // Stream file to browser
    response.data.pipe(res);

  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);

    res.status(500).json({
      message: "Download failed.",
    });
  }
};

// ======================================
// SHARE FILE
// ======================================
const shareFile = async (req, res) => {
  try {
    const file = await File.findOne({
      shareId: req.params.shareId,
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }

    file.downloadCount += 1;
    await file.save();

let resourceType = "raw";

if (file.mimeType?.startsWith("image/")) {
  resourceType = "image";
} else if (file.mimeType?.startsWith("video/")) {
  resourceType = "video";
}

const signedUrl = cloudinary.url(file.publicId, {
  resource_type: resourceType,
  type:
    resourceType === "raw"
      ? "authenticated"
      : "upload",
  sign_url: true,
});

return res.redirect(signedUrl);

  } catch (error) {
    console.error("SHARE ERROR:", error);

    res.status(500).json({
      message: "Unable to access shared file.",
    });
  }
};
// ======================================
// DELETE FILE
// ======================================
const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found.",
      });
    }

    // Only owner can delete
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied.",
      });
    }

    // Determine Cloudinary resource type
    let resourceType = "raw";

   if (file.mimeType?.startsWith("image/")) {
  resourceType = "image";
} else if (file.mimeType?.startsWith("video/")) {
  resourceType = "video";
}

    // Delete from Cloudinary
  const options = {
  resource_type: resourceType,
};

if (resourceType === "raw") {
  options.type = "authenticated";
}

await cloudinary.uploader.destroy(file.publicId, options);

    // Delete from MongoDB
    await File.findByIdAndDelete(file._id);

    return res.status(200).json({
      message: "File deleted successfully.",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return res.status(500).json({
      message: "Delete failed.",
    });
  }
};

module.exports = {
  getFiles,
  uploadFile,
  previewFile,
  downloadFile,
  shareFile,
  deleteFile,
};