require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const connectDB = require('./config/db');
const Resource = require('./models/Resource');

const app = express();
const port = process.env.PORT || 9000;

// CORS options - allow all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Middleware for JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
connectDB();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Set up Multer storage with Cloudinary and file size limit
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Folder in Cloudinary
    allowed_formats: ['pdf', 'jpg', 'png'],
    resource_type: 'auto', // Automatically detect file type
    access_mode: 'public', // Ensure files are publicly accessible
  },
});

// Set file size limit to 5 MB (adjust as needed)
const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 105 * 1024 * 1024 } // Limit set to 105 MB
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { name } = req.body;
    const newResource = new Resource({
      name: name,
      url: req.file.path,  // Cloudinary URL
    });

    await newResource.save();
    res.json({ message: 'File uploaded successfully!', resource: newResource });
  } catch (error) {
    return res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
});

// Route to get all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resources.' });
  }
});

// Route to delete a specific resource
app.delete('/api/resources/:id', async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json({ message: 'Resource deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete resource.' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Resource API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
