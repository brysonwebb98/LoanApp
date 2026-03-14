import { insertLoan } from "../../models/forms/application.js";
import { insertDebt } from "../../models/forms/debt.js";

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
        term,
        has_debt,
        debt_type,
        creditor_name,
        monthly_payment,
        balance_outstanding
    } = req.body;

    const user_id = req.session.user_id;

    const loanResult = await insertLoan(
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

    const application_id = loanResult.rows[0].application_id;

    if (has_debt === "yes") {

        if (Array.isArray(debt_type)) {
            // multiple debts
            for (let i = 0; i < debt_type.length; i++) {
                await insertDebt(
                    application_id,
                    debt_type[i],
                    creditor_name[i],
                    monthly_payment[i],
                    balance_outstanding[i]
                );
            }
        } else {
            // only one debt
            await insertDebt(
                application_id,
                debt_type,
                creditor_name,
                monthly_payment,
                balance_outstanding
            );
        }

    }
    

    console.log("DATA SENT SUCCESSFULLY");
    res.redirect("/dashboard");
}

export {applicationPage, createLoan};