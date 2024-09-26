require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import
const connectDB = require('./config/db'); // MongoDB connection
const Resource = require('./models/Resource'); // Import the resource model

// Initialize Express
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// MongoDB connection
connectDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional: folder in Cloudinary
    allowed_formats: ['pdf', 'jpg', 'png'], // Allowed formats
  },
});

const upload = multer({ storage: storage });

// Upload route
// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  console.log('Upload route hit');
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { name } = req.body;

    // Save resource to the database
    const newResource = new Resource({
      name: name,
      url: req.file.path, // Cloudinary URL
    });

    await newResource.save();
    res.json({ message: 'File uploaded successfully!', resource: newResource });
  } catch (error) {
    console.error('Error uploading file:', error); // Enhanced error logging
    return res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Resource API 3!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
