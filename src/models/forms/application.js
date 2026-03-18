import db from "../db.js"

async function insertLoan(
    user_id,
    first_name,
    last_name,
    dob,
    ssn_last4,
    address,
    time_at_address_years,
    address_type,
    housing_payment,
    employer_name,
    job_title,
    pay_type,
    income_amount,
    loan_type,
    amount,
    term
) {
    const sql = `INSERT INTO applications (
        user_id,
        first_name,
        last_name,
        dob,
        ssn_last4,
        address,
        time_at_address_years,
        address_type,
        housing_payment,
        employer_name,
        job_title,
        pay_type,
        income_amount,
        loan_type,
        amount,
        term
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
    RETURNING application_id`;

    return await db.query(sql, [
        user_id,
        first_name,
        last_name,
        dob,
        ssn_last4,
        address,
        time_at_address_years,
        address_type,
        housing_payment,
        employer_name,
        job_title,
        pay_type,
        income_amount,
        loan_type,
        amount,
        term
    ]);
}

async function getLoans(user_id) {
    const sql = `SELECT * FROM applications
    WHERE user_id = $1`;
    const result = await db.query(sql, [user_id]);
    return result.rows;
}

async function getAllApplications() {
    const sql = `SELECT * FROM applications
    ORDER BY application_id DESC`
    const result = await db.query(sql);
    return result.rows;
}

async function getAllApplicationsWithDebts() {
    const sql = `
        SELECT
            a.*,
            d.debt_id,
            d.debt_type,
            d.creditor_name,
            d.monthly_payment,
            d.balance_outstanding
        FROM applications a
        LEFT JOIN debts d
            ON a.application_id = d.application_id
        ORDER BY a.application_id DESC, d.debt_id ASC
    `;
    const result = await db.query(sql);
    return result.rows;
}

export { insertLoan, getLoans, getAllApplications, getAllApplicationsWithDebts };