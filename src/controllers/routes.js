import { Router } from "express";
import { homePage } from "./index.js";
import { loginPage } from "./forms/login.js";
import { applicationPage } from "./forms/application.js";
import { aboutPage } from "./about.js";

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
})

export default router;