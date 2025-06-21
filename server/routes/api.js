// server/routes/api.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item');
const nodemailer = require('nodemailer');

const router = express.Router();

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });

// --- Nodemailer Configuration ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- API Routes ---

// @route   POST /api/items
// @desc    Add a new item
router.post(
  '/items',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const { name, type, description } = req.body;
      const coverImage = req.files.coverImage[0].filename;
      const additionalImages = req.files.additionalImages 
        ? req.files.additionalImages.map(file => file.filename) 
        : [];

      const newItem = new Item({
        name,
        type,
        description,
        coverImage,
        additionalImages,
      });

      const item = await newItem.save();
      res.status(201).json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/items
// @desc    Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/enquire
// @desc    Send an enquiry email
router.post('/enquire', async (req, res) => {
  try {
    const { itemId } = req.body;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `Enquiry for Item: ${item.name}`,
      html: `
        <h1>New Enquiry</h1>
        <p>An enquiry has been made for the following item:</p>
        <ul>
          <li><strong>Name:</strong> ${item.name}</li>
          <li><strong>Type:</strong> ${item.type}</li>
          <li><strong>Description:</strong> ${item.description}</li>
        </ul>
        <p>You can view the item cover image <a href="http://localhost:5001/uploads/${item.coverImage}">here</a>.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Email could not be sent.');
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send('Enquiry sent successfully.');
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;