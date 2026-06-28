const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '..', 'uploads');
    
    // Fieldname takes priority over URL
    if (file.fieldname === 'document') {
      folder = path.join(__dirname, '..', 'uploads', 'documents');
    } else if (file.fieldname === 'screenshot') {
      folder = path.join(__dirname, '..', 'uploads', 'projects');
    } else if (req.originalUrl.includes('documents')) {
      folder = path.join(__dirname, '..', 'uploads', 'documents');
    } else if (req.originalUrl.includes('projects')) {
      folder = path.join(__dirname, '..', 'uploads', 'projects');
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Sanitize the original file name to prevent directory traversal or malicious paths
    const cleanBaseName = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = path.extname(cleanBaseName);
    const baseWithoutExt = path.basename(cleanBaseName, ext);
    cb(null, `${baseWithoutExt}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Enforce type restrictions for safety
  if (file.fieldname === 'screenshot') {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error('Invalid file type! Only image files (jpeg, jpg, png, gif, webp) are permitted for project screenshots.'), false);
  } else if (file.fieldname === 'document') {
    // Accept documents AND images (diagrams, screenshots, etc.)
    const allowedExtensions = ['.pdf', '.md', '.markdown', '.doc', '.docx', '.txt', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.zip', '.csv'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExt)) {
      return cb(null, true);
    }
    return cb(new Error('Invalid file type for document attachment.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Enforce a 10MB upload limit
});

module.exports = upload;
