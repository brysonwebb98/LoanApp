import {insertUser} from "../../models/forms/registration.js"
import bcrypt from "bcrypt";

const registerPage = (req, res) => {
    res.render("forms/register/form.ejs", {title: "Registration"})
}

async function createUser(req, res) {
    const {username, email, password, confirm_password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUser(username, email, hashedPassword);

    res.redirect("/login");
}

export {registerPage, createUser};