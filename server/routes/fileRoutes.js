const express = require("express");
const router = express.Router();
const File = require("../models/File");
const upload = require("../middleware/upload");
const protect = require("../middleware/authMiddleware");

// UPLOAD FILE
router.post("/upload", protect, upload.single("file"), async (req, res) => {
  try {
    const file = await File.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;