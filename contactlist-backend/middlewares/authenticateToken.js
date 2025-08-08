const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  if (err){
    return res.sendStatus(403);
  }

  console.log('Decoded JWT payload:', user);
  req.user = user;
  next();
});

};

module.exports = authenticateToken;
