const db = require('../db')

const findUserByCredentials = async  (username, password) => {
    const query = 'SELECT * FROM "user" WHERE username = $1 AND password = $2';
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

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM "user" WHERE username = $1'
    const values = [username]
    const result = await db.query(query, values)
    return result.rows[0]
};

const updateUser = async (username, updates) => {
    const query = `UPDATE "user" SET "firstName" = $1, "lastName" = $2, "email" = $3 WHERE "username" = $4 RETURNING *`
    const values = [updates.firstName, updates.lastName, updates.email, username]
    const result = await db.query(query, values)
    return result.rows[0]
}

const deleteUser = async (username) => {
    const query = 'DELETE FROM "user" WHERE "username" = $1 RETURNING *';
    const values = [username]
    const result = await db.query(query, values)
    return result.rows[0]
}

module.exports = {findUserByCredentials, createUser, findUserByUsername, updateUser, deleteUser}
