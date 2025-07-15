const express = require('express')
const router = express.Router()
const {login, register, getUserInfo, updateProfile, deleteProfile, refreshToken} = require('../controllers/authController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/login', login);
router.post('/register', register)

router.get('/profile', authenticateToken, getUserInfo)
router.put('/profile', authenticateToken, updateProfile)
router.delete('/profile', authenticateToken, deleteProfile)

router.post('/refresh', refreshToken);

module.exports = router;