const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Initialize data and upload folders
const directories = [
  path.join(__dirname, 'data'),
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads', 'projects'),
  path.join(__dirname, 'uploads', 'documents')
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize empty json databases if they don't exist
const initializeJsonFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
};
initializeJsonFile(path.join(__dirname, 'data', 'messages.json'));
initializeJsonFile(path.join(__dirname, 'data', 'projects.json'));

// CORS configuration supporting dynamic frontend origin and local testing servers
const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // <!-- REPLACE: your frontend URL -->
    // In case the origin is a deployed frontend URL, allow it:
    return callback(null, true); 
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically for public asset access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes registration
const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');
const pagesRouter = require('./routes/pages'); // Handles auth and documents

app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);
app.use('/api', pagesRouter); // Mount pagesRouter at /api so it maps /api/auth/login and /api/documents

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
