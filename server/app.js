require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/db"); // MongoDB connection
const Resource = require("./models/Resource"); // Import the resource model

// Initialize Express
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// MongoDB connection
connectDB();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename with extension
  },
});

// Set up Multer middleware
const upload = multer({ storage: storage });

// Upload route
// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("Upload route hit");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const { name } = req.body;
    const fileUrl = `uploads/${req.file.filename}`;

    // Temporarily comment out the database saving part
    // const newResource = new Resource({
    //   name: name,
    //   url: fileUrl,
    // });
    // await newResource.save();

    res.json({ message: "File uploaded successfully!", fileUrl: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "File upload failed!", error: error.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Resource API! 12" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
