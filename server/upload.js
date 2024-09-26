const express = require('express');
const multer = require('multer');
const path = require('path');
const Resource = require('./models/Resource');  // Import the resource model

// Create a router instance
const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder to store the files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Unique filename with extension
  }
});

// Set up Multer middleware
const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { name } = req.body;
    const fileUrl = `uploads/${req.file.filename}`;

    // Save resource to the database
    const newResource = new Resource({
      name: name,
      url: fileUrl,
    });

    await newResource.save();
    res.json({ message: 'File uploaded successfully!', resource: newResource });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
});

// Export the router
module.exports = router;
