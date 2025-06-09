const client = require("../service/db")

const insertFile = async (filename, url, public_id, user_id) => {
    const query = `
    INSERT INTO files (filename, url, public_id, user_id)
    VALUES ($1, $2, $3, (SELECT id FROM users WHERE email = $4));
    `;
    try {
        await client.query(query, [filename, url, public_id, user_id]);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { insertFile }