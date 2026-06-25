const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const File = require("../models/File");
const protect = require("../middleware/authMiddleware");


// =======================
// STORAGE CONFIG (MULTER)
// =======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";

    // ensure folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });


// =======================
// GET ALL USER FILES
// =======================
router.get("/", protect, async (req, res) => {
  try {
    const files = await File.find({ uploadedBy: req.user.id });
    res.json(files);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================
// UPLOAD FILE
// =======================
// =======================
// UPLOAD FILE
// =======================
router.post("/upload", protect, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Generate unique share ID
    const shareId = crypto.randomUUID();

    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedBy: req.user.id,
      shareId: shareId,
    });

    res.status(201).json(file);

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});


// =======================
// DOWNLOAD FILE
// =======================





// =======================
// DOWNLOAD FILE (LOGIN REQUIRED)
// =======================
router.get("/download/:id", protect, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const filePath = path.join(__dirname, "..", file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File missing on server",
      });
    }

    res.download(filePath, file.originalName);

  } catch (err) {
    console.log("DOWNLOAD ERROR:", err);

    res.status(500).json({
      message: "Download failed",
    });
  }
});
// =======================
// PUBLIC SHARE DOWNLOAD
// =======================
router.get("/share/:shareId", async (req, res) => {
  try {
    const file = await File.findOne({
      shareId: req.params.shareId,
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    const filePath = path.join(__dirname, "..", file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File missing on server",
      });
    }

    res.download(filePath, file.originalName);

  } catch (err) {
    console.log("SHARE DOWNLOAD ERROR:", err);

    res.status(500).json({
      message: "Download failed",
    });
  }
});

module.exports = router;


// =======================
// DELETE FILE
// =======================
router.delete("/delete/:id", protect, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // security check (owner only)
    if (file.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const filePath = path.join(__dirname, "..", file.path);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;