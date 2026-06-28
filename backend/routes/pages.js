const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// 1. Owner Login Endpoint: POST /api/auth/login
router.post('/auth/login', (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Validation Error', message: 'Password field is required.' });
    }

    const hashedOwnerPassword = process.env.OWNER_PASSWORD_HASH;

    // Validate the password against the stored bcrypt hash in .env
    const isMatch = bcrypt.compareSync(password, hashedOwnerPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid secret credentials.' });
    }

    // Generate JWT token valid for 24 hours
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ role: 'owner' }, secretKey, { expiresIn: '24h' });

    res.json({
      success: true,
      message: 'Authentication successful.',
      token: token
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 2. Upload Document: POST /api/documents — protected
router.post('/documents', auth, upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Upload Error', message: 'No document payload was sent in the request.' });
    }

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully.',
      data: {
        filename: req.file.filename,
        downloadUrl: `/api/documents/${req.file.filename}`
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 3. List Documents: GET /api/documents — public
router.get('/documents', (req, res) => {
  try {
    const documentsDirectory = path.join(__dirname, '..', 'uploads', 'documents');
    if (!fs.existsSync(documentsDirectory)) {
      return res.json([]);
    }

    const files = fs.readdirSync(documentsDirectory);
    const documentsList = files.map(filename => ({
      filename: filename,
      downloadUrl: `/api/documents/${filename}`
    }));

    res.json(documentsList);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 4. Download Document: GET /api/documents/:filename — public
router.get('/documents/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    
    // Resolve absolute path to prevent directory traversal
    const safeFilename = path.basename(filename);
    const filePath = path.join(__dirname, '..', 'uploads', 'documents', safeFilename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Not Found', message: `File ${safeFilename} does not exist.` });
    }

    res.download(filePath, safeFilename);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// --- Service Document Routes ---
const servicesDataPath = path.join(__dirname, '..', 'data', 'services.json');

const readServices = () => {
  try {
    if (!fs.existsSync(servicesDataPath)) return {};
    return JSON.parse(fs.readFileSync(servicesDataPath, 'utf8') || '{}');
  } catch { return {}; }
};
const writeServices = (data) => {
  fs.writeFileSync(servicesDataPath, JSON.stringify(data, null, 2), 'utf8');
};

// 5. GET /api/services/:slug/documents — public, list documents for a service
router.get('/services/:slug/documents', (req, res) => {
  const { slug } = req.params;
  const services = readServices();
  res.json(services[slug] || []);
});

// 6. POST /api/services/:slug/documents — protected, upload and attach doc to service
router.post('/services/:slug/documents', auth, upload.single('document'), (req, res) => {
  try {
    const { slug } = req.params;
    const { label } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Validation Error', message: 'No document file provided.' });
    }

    const docEntry = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      label: label || req.file.originalname,
      downloadUrl: `/uploads/documents/${req.file.filename}`,
      uploadedAt: new Date().toISOString()
    };

    const services = readServices();
    if (!services[slug]) services[slug] = [];
    services[slug].push(docEntry);
    writeServices(services);

    res.status(201).json({ success: true, message: 'Document attached to service.', data: docEntry });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 7. DELETE /api/services/:slug/documents/:filename — protected, remove doc from service
router.delete('/services/:slug/documents/:filename', auth, (req, res) => {
  try {
    const { slug, filename } = req.params;
    const safeFilename = path.basename(filename);
    const services = readServices();
    const docs = services[slug] || [];
    const docIndex = docs.findIndex(d => d.filename === safeFilename);

    if (docIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: 'Document not found.' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', 'documents', safeFilename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    services[slug].splice(docIndex, 1);
    writeServices(services);

    res.json({ success: true, message: 'Document removed from service.' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;
