import db from "../db.js"

async function insertDebt (
    application_id,
    debt_type,
    creditor_name,
    monthly_payment,
    balance_outstanding
) {
    const sql = 
    `INSERT INTO debts (
    application_id,
    debt_type,
    creditor_name,
    monthly_payment,
    balance_outstanding
    )
    VALUES ($1, $2, $3, $4, $5)`


    return await db.query(sql, [
        application_id,
        debt_type,
        creditor_name,
        monthly_payment,
        balance_outstanding
    ])
}

export {insertDebt};