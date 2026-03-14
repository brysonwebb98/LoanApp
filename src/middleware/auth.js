function checkLogin(req, res, next) {
    console.log("SESSION IN checkLogin:", req.session);
    console.log("USER ID:", req.session.user_id);
    if (!req.session.user_id) {
        return res.redirect("/login");
    }
    next();
}

function redirectIfLoggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect("/dashboard");
    }
    next();
}

function checkCreditManager(req, res, next) {
    if (req.session.role !== 'credit_manager') {
        return res.redirect("/dashboard");
    }
    next();
}

function checkApplicant(req, res, next) {
    if (req.session.role !== "applicant") {
        return res.redirect("/review");
    }
    next();
}

export {checkLogin, redirectIfLoggedIn, checkCreditManager, checkApplicant};