const express = require('express')
const router = express.Router()
const {login, register, getUserInfo, updateProfile, deleteProfile, refreshToken, verify2FA, toggle2FA, verifyEmail, resendVerificationLink, forgotPassword, updatePassword, logout} = require('../controllers/authController')
const authenticateToken  = require('../middlewares/authenticateToken')
const authenticateTempToken = require('../middlewares/authenticateTempToken')

router.post('/login', login);
router.post('/register', register)

router.get('/profile', authenticateToken, getUserInfo)
router.put('/profile', authenticateToken, updateProfile)
router.delete('/profile', authenticateToken, deleteProfile)

router.post('/refresh', refreshToken);

router.post('/verify-2fa', authenticateTempToken, verify2FA)
router.post('/toggle-2fa', authenticateToken, toggle2FA)

router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationLink);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", updatePassword);

router.post('/logout',logout);

module.exports = router;