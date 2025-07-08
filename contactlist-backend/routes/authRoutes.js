const express = require('express')
const router = express.Router()
const {login, register, updateProfile} = require('../controllers/authController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/login', login);
router.post('/register', register)

router.put('/profile', authenticateToken, updateProfile)

module.exports = router;