const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const fileRoutes = require("./routes/fileRoutes");
  
app.use("/api/files", fileRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Cloud File Sharing API Running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




app.get("/test-upload", (req, res) => {
  res.send(`
    <form action="/test-upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

const upload = require("./middleware/upload");

app.post("/test-upload", upload.single("file"), (req, res) => {
  console.log("FILE:", req.file);
  res.json(req.file);
});