// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path =require('path');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// --- Serve Static Files ---
// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes ---
app.use('/api', require('./routes/api'));

// --- Start Server ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));