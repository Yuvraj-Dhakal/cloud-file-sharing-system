const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  getFiles,
  uploadFile,
  downloadFile,
  deleteFile,
  shareFile,
  previewFile,
} = require("../controllers/fileController");


// ===========================
// GET ALL USER FILES
// ===========================
router.get("/", protect, getFiles);

// ===========================
// UPLOAD FILE
// ===========================
router.post("/upload", protect, (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("MULTER ERROR:", err);

      return res.status(400).json({
        message: err.message,
      });
    }

    next();
  });
}, uploadFile);

// ===========================
// PREVIEW FILE
// ===========================
router.get(
  "/preview/:id",
  protect,
  previewFile
);

// ===========================
// DOWNLOAD FILE
// ===========================
router.get(
  "/download/:id",
  
  downloadFile
);

// ===========================
// PUBLIC SHARE
// ===========================
router.get(
  "/share/:shareId",
  shareFile
);

// ===========================
// DELETE FILE
// ===========================
router.delete(
  "/delete/:id",
  protect,
  deleteFile
);

module.exports = router;