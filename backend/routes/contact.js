const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Contact form submission - saves to database
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save contact message to database
    const contact = new Contact({
      name,
      email,
      message
    });

    await contact.save();

    console.log(`New message from ${name} (${email})`);
    res.json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Error saving message', error: error.message });
  }
});

// Get all contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

module.exports = router;


