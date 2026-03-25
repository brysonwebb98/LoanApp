import {insertUser, emailExists, usernameExists} from "../../models/forms/registration.js"
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const registerPage = (req, res) => {
    res.render("forms/register/form.ejs", {title: "Registration"})
}

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array()[0].msg);
        return res.redirect("/register");
    }
    try {
        const username = req.body.username?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if (!username || !email || !password || !confirm_password) {
            req.flash("error", "All fields are required.");
            return res.redirect("/register");
        }

        if (password !== confirm_password) {
            req.flash("error", "Passwords do not match.");
            return res.redirect("/register");
        }

        if (password.length < 8) {
            req.flash("error", "Password must be at least 8 characters.");
            return res.redirect("/register");
        }   

        if (!email.includes("@")) {
            req.flash("error", "Please enter a valid email address.");
            return res.redirect("/register");
        }

        if (await emailExists(email)) {
            req.flash("error", "Email already registered");
            return res.redirect("/register")
        }

        if (await usernameExists(username)) {
            req.flash("error", "Username already registered");
            return res.redirect("/register")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await insertUser(username, email, hashedPassword);

        req.flash("success", "Account created successfully. Please log in.");
        return res.redirect("/login");
    } catch (error) {
        console.error("Error creating user:", error);
        req.flash("error", "Unable to create account. Please try again.");
        return res.redirect("/register");
    }
}

export {registerPage, createUser};