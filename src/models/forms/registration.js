import db from "../db.js"

async function insertUser (
    username, 
    email, 
    password
) {
    const sql = `INSERT INTO users (
    username,
    email, 
    password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING user_id, username, email`;

    return await db.query(sql, [
        username, 
        email, 
        password 
    ]);
}

async function emailExists(email) {
    const sql = `
    SELECT email 
    FROM users
    WHERE email = $1
    `;

    const result = await db.query(sql, [email]);
    return result.rowCount > 0;
}

export {insertUser, emailExists};