// server/models/Item.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // Path to the cover image
    required: true,
  },
  additionalImages: {
    type: [String], // Array of paths to additional images
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);