const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// ===========================
// Middleware
// ===========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===========================
// Routes
// ===========================

const authRoutes = require("./routes/authRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const fileRoutes = require("./routes/fileRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/auth", googleAuthRoutes);

app.use("/api/files", fileRoutes);

// ===========================
// Home Route
// ===========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to YuvNext Cloud Storage API",
    version: "1.0.0",
  });
});

// ===========================
// Health Check
// ===========================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

// ===========================
// 404 Route
// ===========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// ===========================
// Global Error Handler
// ===========================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error.",
  });
});

// ===========================
// Start Server
// ===========================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});