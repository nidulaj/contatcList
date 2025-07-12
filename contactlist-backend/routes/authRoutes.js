const express = require('express')
const router = express.Router()
const {login, register, updateProfile, deleteProfile} = require('../controllers/authController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/login', login);
router.post('/register', register)

router.put('/profile', authenticateToken, updateProfile)
router.delete('/profile', authenticateToken, deleteProfile)

module.exports = router;