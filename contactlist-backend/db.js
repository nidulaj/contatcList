const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DBHost,
    user: process.env.DBUser,
    port: process.env.DBPort,
    password: process.env.DBPassword,
    database: process.env.DBDatabase
});

pool.connect()
    .then(() => console.log('database connected'))
    .catch(err => console.error('connection error', err.stack));

module.exports = pool;
