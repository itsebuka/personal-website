const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

// Rate limiter: 3 requests per hour per IP address
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 3, 
  message: { 
    error: 'Too Many Requests', 
    message: 'Too many transmission attempts from this connection. Rate limit exceeded: 3 per hour. Please try again in an hour.' 
  },
  standardHeaders: true,
  legacyHeaders: false
});

router.post('/', contactLimiter, (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Validation Error', message: 'Name is required.' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ error: 'Validation Error', message: 'A valid email address is required.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Validation Error', message: 'Message payload cannot be empty.' });
    }

    // Read and parse current logs
    let messages = [];
    if (fs.existsSync(messagesPath)) {
      const rawData = fs.readFileSync(messagesPath, 'utf8');
      messages = JSON.parse(rawData || '[]');
    }

    const newMessage = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2), 'utf8');

    res.status(201).json({
      success: true,
      message: 'Transmission bridged successfully.',
      data: { id: newMessage.id }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;
