const db = require('../db')

const findUserByCredentials = async  (username, password) => {
    const query = 'SELECT FROM "user" WHERE username = $1 AND password = $2';
    const values = [username, password]
    const result = await db.query(query, values)
    return result.rows[0]
}

const createUser = async (firstName, lastName, email, username, password) => {
    const query = `INSERT INTO "user" ("firstName", "lastName", "email", "username", "password") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [firstName, lastName, email, username, password]
    const result = await db.query(query, values)
    return result.rows[0]
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM "user" WHERE email = $1'
    const values = [email]
    const result = await db.query(query, values)
    return result.rows[0]
};

module.exports = {findUserByCredentials, createUser, findUserByEmail}
