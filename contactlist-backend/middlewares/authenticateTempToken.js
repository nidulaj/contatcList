const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateTempToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Temp token missing' });
  }

  jwt.verify(token, process.env.TEMP_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired temp token' });
    }
    console.log('Decoded JWT payload:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateTempToken;
