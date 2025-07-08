const db = require('../db')

const findUserByCredentials = async  (username, password) => {
    const query = 'SELECT FROM "user" WHERE username = $1 AND password = $2';
    const values = [username, password]
    const result = await db.query(query, values)
    return result.rows[0]
}

module.exports = {findUserByCredentials}
