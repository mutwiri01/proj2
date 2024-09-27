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
  origin: '*', // Allow all origins for testing purposes
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
});

// Set up Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['pdf', 'jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { name } = req.body;
    const newResource = new Resource({
      name: name,
      url: req.file.path,
    });

    await newResource.save();
    res.json({ message: 'File uploaded successfully!', resource: newResource });
  } catch (error) {
    return res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
});

// Route to get all resources
app.get('/api/resources', async (req, res) => {
  console.log('Request received for /api/resources');
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resources.' });
  }
});


// Route to download a specific resource
app.get('/api/download/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.redirect(resource.url);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to download resource.' });
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
  res.status(200).json({ message: 'Welcome to the Resource API 5!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
