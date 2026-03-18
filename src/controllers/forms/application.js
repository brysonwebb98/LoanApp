import { insertLoan } from "../../models/forms/application.js";
import { insertDebt } from "../../models/forms/debt.js";

const applicationPage = (req, res) => {
    return res.render("forms/application/form.ejs", {
        title: "Application"
    });
};

async function createLoan(req, res) {
    try {
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

        if (!user_id) {
            req.flash("error", "You must be logged in to submit an application.");
            return res.redirect("/login");
        }

        if (!first_name || !last_name || !loan_type || !amount || !term) {
            req.flash("error", "Please complete all required application fields.");
            return res.redirect("/application");
        }

        if (has_debt === "yes") {
            if (!debt_type || !creditor_name || !monthly_payment || !balance_outstanding) {
                req.flash("error", "Please complete all debt fields.");
                return res.redirect("/application");
            }
        }

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
            await insertDebt(
                application_id,
                debt_type,
                creditor_name,
                Number(monthly_payment),
                Number(balance_outstanding)
            );
        }

        req.flash("success", "Application submitted successfully.");
        return res.redirect("/dashboard");
    } catch (err) {
        console.error("Application submission error", err);
        req.flash("error", "Unable to submit application right now. Please try again.");
        return res.redirect("/application");
    }
}

export { applicationPage, createLoan };