const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      unique: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      default: "",
    },

    mimeType: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    shareId: {
      type: String,
      required: true,
      unique: true,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);