const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    ssl: connectionString.includes('localhost')
    ? false :
    { rejectUnauthorized: false }
});

try {
    require('dotenv').config();
} catch (e) {
    console.log(e);
}

module.exports = pool;