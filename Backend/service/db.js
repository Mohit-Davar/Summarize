const Client = require("pg").Client;
require("dotenv").config()
const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: { rejectUnauthorized: false }
});

module.exports = client