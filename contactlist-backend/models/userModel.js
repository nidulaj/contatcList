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

const send2FACodeToDB =  async (code, userId) => {
    const query = 'UPDATE "user" SET two_fa_code = $1 WHERE id = $2';
    const values = [code, userId]
    const result = await db.query(query, values)
    return result.rows[0]
}

const get2FA = async (username, code) => {
    const query = 'SELECT * FROM "user" WHERE username = $1 AND two_fa_code = $2'
    const values = [username, code]
    const result = await db.query(query, values)
    return result.rows[0]
}

const delete2FA = async (username) => {
     const query = 'UPDATE "user" SET two_fa_code = NULL WHERE username = $1'
     const values = [username]
     const result = await db.query(query, values)
     return result.rows[0]
}

const get2FAStatus = async (username) => {
    const query = 'SELECT "two_fa_enabled" FROM "user" WHERE username = $1'
    const values = [username]
    const result = await db.query(query, values)
    return result.rows[0]
}

const change2FAStatus = async (status, username) => {
    const newStatus = !status.two_fa_enabled;
    const query = 'UPDATE "user" SET "two_fa_enabled" = $1 WHERE username = $2'
    const values = [newStatus, username]
    const result = await db.query(query, values)
    console.log("test, username",username,"and new status", newStatus)
    return result.rows[0]
}


module.exports = {findUserByCredentials, createUser, findUserByUsername, updateUser, deleteUser, send2FACodeToDB, get2FA, delete2FA, get2FAStatus, change2FAStatus}
