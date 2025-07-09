const express =  require('express')
const router =  express.Router()
const {createNewContact} = require('../controllers/contatcController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/newContact', authenticateToken, createNewContact)

module.exports = router;