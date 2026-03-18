import db from "../db.js"

async function updateStatus(application_id, status) {
    const sql = `
    UPDATE applications
    SET status = $1
    WHERE application_id = $2`;

    return await db.query(sql, [status, application_id]);
}

export {updateStatus};