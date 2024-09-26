require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // MongoDB connection
const uploadRoute = require('./upload');  // Import the router from upload.js

// Initialize Express
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Adjust as necessary for your frontend
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// MongoDB connection
connectDB();

// Use the upload route
app.use('/api', uploadRoute);  // Mount the upload route under '/api'

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Resource API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
