import { Router } from "express";
import { homePage, aboutPage, processPage } from "./index.js";
import { loginPage, loginUser, logoutUser } from "./forms/login.js";
import { applicationPage, createLoan } from "./forms/application.js";
import { registerPage } from "./forms/register.js";
import { loanPage } from "./loans/dashboard.js";
import { createUser } from "./forms/register.js";
import {checkLogin, redirectIfLoggedIn, checkCreditManager, checkApplicant} from "../middleware/auth.js"
import { buildManagerDashboard} from "./loans/review.js";


const router = Router();

// HOME PAGE
router.get("/", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/home.css">')
    homePage(req, res);
});

// LOGIN PAGE
router.get("/login", redirectIfLoggedIn, (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/login.css">');
    loginPage(req, res);
});

// APPLICATION PAGE
router.get("/application", checkLogin, (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/application.css">');
    applicationPage(req, res);
});

// ABOUT PAGE
router.get("/about", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/about.css">');
    aboutPage(req, res);
});

// REGISTRATION PAGE
router.get("/register", redirectIfLoggedIn, (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/register.css">')
    registerPage(req, res);
});

// PROCESS PAGE
router.get("/process", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/process.css">')
    processPage(req, res);
});

// DASHBOARD PAGE
router.get("/dashboard", checkApplicant, checkLogin, (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/dashboard.css">')
    loanPage(req, res);
});

// REVIEW PAGE
router.get("/review", checkLogin, checkCreditManager, (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/dashboard.css">')
    buildManagerDashboard(req, res, next);
});

// LOGOUT TO REDIRECT TO HOME PAGE
router.get("/logout", checkLogin, logoutUser);

// POSTING THE APPLICATION TO THE DATABASE
router.post("/application", checkLogin, createLoan);

// LOGIN PAGE POST
router.post("/login", redirectIfLoggedIn, loginUser);

// REGISTRATION POST
router.post("/register", redirectIfLoggedIn, createUser);

export default router;