const mongoose = require('mongoose');

// Define the resource schema
const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Resource model
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
