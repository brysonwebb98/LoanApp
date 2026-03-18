import db from "./db.js"

async function getUsers() {
    const sql = `SELECT * FROM users`;
    const result = await db.query(sql);
    return result.rows;
}

async function deleteUser(user_id) {
    const sql = `DELETE FROM users WHERE user_id = $1`
    return await db.query(sql, [user_id])
}

async function updateRole(role, user_id) {
    const sql = `
    UPDATE users 
    SET role = $1
    WHERE user_id = $2`
    return await db.query(sql, [role, user_id]);
}

export {getUsers, deleteUser, updateRole};