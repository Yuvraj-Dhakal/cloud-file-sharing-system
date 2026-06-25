const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    originalName: String,
    path: String,
    size: Number,

    // who uploaded it
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🔥 NEW: public sharing system
    shareId: {
      type: String,
      unique: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);