const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')

const app = express();
app.use(express.json());


app.use('/auth', authRoutes)


// 🚀 Start server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
