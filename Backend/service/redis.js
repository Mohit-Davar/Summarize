const Redis = require('ioredis');
const dotenv = require("dotenv")
dotenv.config()
const redis = new Redis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
});

module.exports = redis