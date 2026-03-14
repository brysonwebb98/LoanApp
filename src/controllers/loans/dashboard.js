import {getLoans} from "../../models/forms/application.js"

const loanPage = async (req, res) => {
    const user_id = req.session.user_id;
    const loans = await getLoans(user_id);
    res.render('dashboard', {title: "Loan Applications", loans});
}

export {loanPage};