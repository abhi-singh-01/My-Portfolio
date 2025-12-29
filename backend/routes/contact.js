const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Contact form submission - saves to database and sends email
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

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL || 'abhijeetsingh03.dev@gmail.com',
        subject: `New Portfolio Message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Sent from your Portfolio website</small></p>
        `
      });
      console.log(`Email notification sent for message from ${name}`);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails - message is still saved
    }

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


