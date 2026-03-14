import {getLoans} from "../../models/forms/application.js"

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const loanPage = async (req, res) => {
    const user_id = req.session.user_id;
    const loans = await getLoans(user_id);
    res.render('dashboard', {title: "Loan Applications", loans, capitalize});
}

export {loanPage};