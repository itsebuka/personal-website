const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access Denied', message: 'No Bearer token provided in Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    // <!-- REPLACE: your secret key -->
    const secretKey = process.env.JWT_SECRET;
    
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Forbidden', message: 'Invalid or expired token' });
  }
};
