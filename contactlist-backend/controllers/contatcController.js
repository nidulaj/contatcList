const {createContact, getUserID, getAllContacts} = require('../models/contactModel')

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
        res.status(200).json({ contacts });
    } catch(err) {
        console.error('Get contacts error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {createNewContact, getContactByUser}