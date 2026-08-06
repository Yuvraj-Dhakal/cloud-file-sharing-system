const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    let folder = "YuvNext/Others";

    if (file.mimetype.startsWith("image/")) {
      folder = "YuvNext/Images";
    }
    else if (file.mimetype.startsWith("video/")) {
      folder = "YuvNext/Videos";
    }
    else {
      folder = "YuvNext/Documents";
    }
return {
  folder,

  resource_type:
    file.mimetype.startsWith("image/")
      ? "image"
      : file.mimetype.startsWith("video/")
      ? "video"
      : "raw",

 type:
  file.mimetype.startsWith("image/") ||
  file.mimetype.startsWith("video/")
    ? "upload"
    : "authenticated",

  public_id:
    Date.now() +
    "-" +
    path.parse(file.originalname).name,

  overwrite:false,
};

  },

});


const upload = multer({

  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    cb(null, true);
  },

});


module.exports = upload;