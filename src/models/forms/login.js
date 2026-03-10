import db from "../db.js"
import bcrypt from "bcrypt"

async function getUserByEmail(email){
    const sql = `
    SELECT * FROM users
    WHERE email = $1`

    const result = await db.query(sql, [email]);
    return result.rows[0];
}

const verifyPassword = async (plainPassword, hashedPassword) => {

    // FUNCTION TO CHECK PASSWORD
    return bcrypt.compare(plainPassword, hashedPassword)
};

export {getUserByEmail, verifyPassword};