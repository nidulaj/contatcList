const express =  require('express')
const router =  express.Router()
const {createNewContact, getContactByUser, updateExistingContact, deleteExistingContact, generateContactsPDF} = require('../controllers/contatcController')
const authenticateToken  = require('../middlewares/authenticateToken')

router.post('/newContact', authenticateToken, createNewContact)
router.post('/', authenticateToken, getContactByUser)
router.put('/:id', authenticateToken, updateExistingContact)
router.delete('/:id', authenticateToken, deleteExistingContact)

router.get('/export-pdf', authenticateToken, generateContactsPDF);

module.exports = router;