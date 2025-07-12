const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/contact', contactRoutes)



app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
