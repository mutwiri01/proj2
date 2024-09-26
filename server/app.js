require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Correct import
const connectDB = require('./config/db'); // MongoDB connection
const Resource = require('./models/Resource'); // Import the resource model

// Initialize Express
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors()); // Enable CORS
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
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'File upload failed!', error: error.message });
  }
});

// Route to get all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find(); // Fetch all resources from the database
    res.json(resources); // Send resources as response
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ message: 'Failed to fetch resources.' });
  }
});

// Route to download a specific resource
app.get('/api/download/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id); // Find resource by ID
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    // Redirect to Cloudinary URL for downloading
    res.redirect(resource.url); 
  } catch (error) {
    console.error('Error downloading resource:', error);
    return res.status(500).json({ message: 'Failed to download resource.' });
  }
});

// Route to delete a specific resource
app.delete('/api/resources/:id', async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id); // Delete resource by ID
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.json({ message: 'Resource deleted successfully.' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return res.status(500).json({ message: 'Failed to delete resource.' });
  }
});


// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Resource API 2!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
