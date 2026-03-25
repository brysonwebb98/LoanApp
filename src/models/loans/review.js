import db from "../db.js"

async function updateStatus(application_id, status) {
    const sql = `
    UPDATE applications
    SET status = $1
    WHERE application_id = $2`;

    return await db.query(sql, [status, application_id]);
}

async function deleteApplication(application_id) {
    const sql = `
    DELETE FROM applications
    WHERE application_id = $1`;

    const result = await db.query(sql, [application_id]);
    return result.rowCount > 0;
}

export {updateStatus, deleteApplication};