const {createContact, getUserID, getAllContacts, updateContact, deleteContact} = require('../models/contactModel')

const createNewContact = async (req, res) => {
    const {firstName, lastName, phoneNumber, email, birthday} = req.body
    const username = req.user.username

    try{
        const userId = await getUserID(username);
        const newContact = await createContact(firstName, lastName, phoneNumber, email, birthday, userId.id)
        res.status(201).json({message: "Contact added successfully", contact : newContact})
    } catch(err){
        console.error('New contact error:', err);
        res.status(500).json({error: "Server error"})
    }
};

const getContactByUser = async (req, res) => {
    const username = req.user.username
    try{
        const userId = await getUserID(username);
        const contacts = await getAllContacts(userId.id)
        console.log(contacts)
        res.status(200).json({ contacts });
    } catch(err) {
        console.error('Get contacts error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

const updateExistingContact  = async (req, res) => {
    const contactId = req.params.id
    const {firstName, lastName, phoneNumber, email, birthday} = req.body

    try{
        const updatedContact = await updateContact(firstName, lastName, phoneNumber, email, birthday, contactId)
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found or not authorized" });
        }

        res.status(200).json({message: "Contact updated", contact: updatedContact})
    } catch(err){
        console.error("Update contact error :", err)
        res.status(500).json({error: "Server error"})
    }
}

const deleteExistingContact = async (req, res) => {
    const contactId = req.params.id

    try{
        const deletedContact = await deleteContact(contactId)
        if(!deletedContact){
            return res.status(404).json({ message: "Contact not found or not authorized" });
        }

        res.status(200).json({message: "Contact deleted"})
    } catch(err){
        console.error("Delete contact error :", err)
        res.status(500).json({error: "Server error"})
    }
}

module.exports = {createNewContact, getContactByUser, updateExistingContact, deleteExistingContact}