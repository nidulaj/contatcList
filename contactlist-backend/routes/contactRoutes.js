const express =  require('express')
const router =  express.Router()
const {createNewContact, getContactByUser, updateExistingContact} = require('../controllers/contatcController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/newContact', authenticateToken, createNewContact)
router.post('/', authenticateToken, getContactByUser)
router.put('/:id', authenticateToken, updateExistingContact)
module.exports = router;