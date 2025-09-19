const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const port = process.env.Port || 5000;
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/contact', contactRoutes)



app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
