require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");  // Connect to MongoDB
const Resource = require('./models/Resource'); // Resource model
const upload = require('./upload');  // Multer middleware
const path = require('path'); // Import path module
const fs = require('fs'); // Import fs module

const port = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Set up a route for file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { name } = req.body;
        const fileUrl = `uploads/${req.file.filename}`;
        
        const newResource = new Resource({
            name: name,
            url: fileUrl,
        });

        await newResource.save();
        res.json({ message: 'File uploaded successfully!', resource: newResource });
    } catch (error) {
        console.error('Error uploading file', error);
        res.status(500).json({ message: 'File upload failed!', error: error.message });
    }
});

// Create a router instance for resource routes
const router = express.Router();

// GET route to fetch all resources
router.get("/resources", async (req, res) => {
    try {
        const resources = await Resource.find(); // Fetch all resources from the database
        res.json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        res.status(500).json({ message: "Server error while fetching resources." });
    }
});

// Download route
router.get('/download/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        const filePath = path.join(__dirname, resource.url); // Get the full file path
        res.download(filePath, resource.name); // Start the download
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).json({ message: "File download failed!" });
    }
});

// Delete route
router.delete('/resources/:id', async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Resource not found." });
        }

        // Delete the resource from the database
        await Resource.findByIdAndDelete(req.params.id);

        // Remove the file from the server
        const filePath = path.join(__dirname, resource.url);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).json({ message: "File deletion failed!" });
            }
        });

        res.json({ message: "Resource deleted successfully." });
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ message: "Server error while deleting resource." });
    }
});

// Test route
app.get("/test", (req, res) => {
    return res.status(200).json({ success: true, message: "Test successful. Server is successfully running!" });
});

// Use the resource routes
app.use("/api", router);

// Start the server
app.listen(port, () => {
    console.log("Connected to port " + port);
});
