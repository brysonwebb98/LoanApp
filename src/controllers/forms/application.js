import { insertLoan } from "../../models/forms/application.js";

const applicationPage = (req, res) => {
    res.render("forms/application/form.ejs", {title: "Application"})
}

async function createLoan(req, res) {
    console.log("BODY:", req.body);
    const { 
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
    } = req.body;

    const user_id = req.session.user_id;

    await insertLoan(
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
    );

    console.log("DATA SENT SUCCESSFULLY");
    res.redirect("/dashboard");
}

export {applicationPage, createLoan};