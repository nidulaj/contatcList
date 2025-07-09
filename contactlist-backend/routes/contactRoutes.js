const express =  require('express')
const router =  express.Router()
const {createNewContact, getContactByUser} = require('../controllers/contatcController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/newContact', authenticateToken, createNewContact)
router.post('/allContacts', authenticateToken, getContactByUser)

module.exports = router;