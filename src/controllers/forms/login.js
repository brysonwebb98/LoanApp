import { getUserByEmail, verifyPassword } from "../../models/forms/login.js";

const loginPage = (req, res) => {
    res.render('forms/login/form.ejs', {title: "Login Page"})
}

const loginUser = async (req, res) => {

    try{
        // GETTING THE EMAIL AND PASSWORD FROM THE REQUEST
        const {email, password} = req.body;

        // USING THE MODEL FUNCTION TO FIND THE USER AND GET THE USER INFO
        const user = await getUserByEmail(email);

        // IF NO USER THEN REDIRECT THEM
        if (!user){
            // ADD FLASH MESSAGE
            return res.redirect("/login");
        }
        // IF THERE IS A USER DOES THE PASSSWORD MATCH?
        const passwordCorrect = await verifyPassword(password, user.password_hash)

        if (!passwordCorrect)
        {
            return res.redirect('/login');
        }

        delete user.password_hash;
        req.session.user_id = user.user_id;
        req.session.role = user.role;
        req.session.username = user.username;
        
        if (user.role === "credit_manager") {
            return res.redirect("/review");
        } else {
            return res.redirect("/dashboard");
}

    } catch (err) {
        console.error(err);
    }


}

function logoutUser(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}

export {loginPage, loginUser, logoutUser};