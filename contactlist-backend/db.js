const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: 
        process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    
});

pool.connect()
    .then(() => console.log('database connected'))
    .catch(err => console.error('connection error', err.stack));

module.exports = pool;
