require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// 🔐 Hardcoded users (like a mini database)
const users = [
  { username: 'kyle', password: '1234' },
  { username: 'jim', password: 'abcd' }
];

// 📝 Sample posts
const posts = [
  { username: 'kyle', title: 'Post 1' },
  { username: 'jim', title: 'Post 2' }
];

// 🔐 Login route – checks username & password
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ name: user.username }, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

// 🔒 Protected route – requires token
app.get('/posts', authenticateToken, (req, res) => {
  const userPosts = posts.filter(post => post.username === req.user.name);
  res.json(userPosts);
});

// 🔍 Middleware to check token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 🚀 Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
