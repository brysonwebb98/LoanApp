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

export {insertUser};