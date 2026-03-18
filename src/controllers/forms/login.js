import { getUserByEmail, verifyPassword } from "../../models/forms/login.js";

const loginPage = (req, res) => {
    res.render('forms/login/form.ejs', {title: "Login Page"})
}

const loginUser = async (req, res) => {

    try{
        // GETTING THE EMAIL AND PASSWORD FROM THE REQUEST
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!email || !password) {
            req.flash("error", "Email and password are required.");
            return res.redirect("/login");
        }

        // USING THE MODEL FUNCTION TO FIND THE USER AND GET THE USER INFO
        const user = await getUserByEmail(email);

        // IF NO USER THEN REDIRECT THEM
        if (!user){
            // ADD FLASH MESSAGE
            req.flash("error", "Invalid email or password.")
            return res.redirect("/login");
        }
        // IF THERE IS A USER DOES THE PASSSWORD MATCH?
        const passwordCorrect = await verifyPassword(password, user.password_hash)

        if (!passwordCorrect)
        {
            req.flash("error", "Invalid email or password.")
            return res.redirect('/login');
        }

        delete user.password_hash;
        req.session.user_id = user.user_id;
        req.session.role = user.role;
        req.session.username = user.username;

        req.flash("success", `Welcome back, ${user.username}!`);
        
        if (user.role === "credit_manager") {
            return res.redirect("/review");
        } else if (user.role === "admin"){
            return res.redirect("/users");
        } else {
            return res.redirect("/dashboard");
        }

    } catch (err) {
        console.error("Login error:", err);
        req.flash("error", "Unable to log in right now. Please try again.");
        return res.redirect("/login");
    }
}

function logoutUser(req, res) {
    req.flash("success", "Successfully logged out.")
    delete req.session.user_id;
    delete req.session.role;
    delete req.session.username;

    return res.redirect("/");
}

export {loginPage, loginUser, logoutUser};