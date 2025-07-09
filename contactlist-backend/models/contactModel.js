const db = require('../db')

const createContact = async (firstName, lastName, phoneNumber, email, birthday, userId) => {
    const query =  `INSERT INTO "contact" ("firstName", "lastName", "phoneNumber", "email", "birthday", "user_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING * `
    const values = [firstName, lastName, phoneNumber, email, birthday, userId]
    const result = await db.query(query, values)
    return result.rows[0]
};

const getUserID = async (username) => {
    const query = 'SELECT id FROM "user" WHERE username = $1'
    const values = [username]
    const result = await db.query(query, values)
    return result.rows[0]
}

module.exports = {createContact, getUserID}