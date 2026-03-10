import { Router } from "express";
import { homePage, aboutPage, processPage } from "./index.js";
import { loginPage, loginUser } from "./forms/login.js";
import { applicationPage, createLoan } from "./forms/application.js";
import { registerPage } from "./forms/register.js";
import { loanPage } from "./loans/dashboard.js";
import { createUser } from "./forms/register.js";

const router = Router();

// HOME PAGE
router.get("/", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/home.css">')
    homePage(req, res);
});

// LOGIN PAGE
router.get("/login", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/login.css">');
    loginPage(req, res);
});

// APPLICATION PAGE
router.get("/application", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/application.css">');
    applicationPage(req, res);
});

// ABOUT PAGE
router.get("/about", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/about.css">');
    aboutPage(req, res);
});

// REGISTRATION PAGE
router.get("/register", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/forms/register.css">')
    registerPage(req, res);
});

// REGISTRATION POST
router.post("/register", createUser);

// PROCESS PAGE
router.get("/process", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/process.css">')
    processPage(req, res);
});

// DASHBOARD PAGE
router.get("/dashboard", (req, res) => {
    res.addStyle('<link rel="stylesheet" href="/css/dashboard.css">')
    loanPage(req, res);
});

// POSTING THE APPLICATION TO THE DATABASE
router.post("/apply", createLoan);

// LOGIN PAGE POST
router.post("/login", loginUser);

export default router;