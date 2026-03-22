function checkLogin(req, res, next) {
    if (!req.session.user_id) {
        console.log(req.session);
        req.flash("error", "You must be logged in to view this page.")
        return res.redirect("/login");
    }
    next();
}

function redirectIfLoggedIn(req, res, next) {
    if (req.session.user_id) {
        req.flash("error", "You are already logged in.")
        return res.redirect("/");
    }
    next();
}

function checkCredit(req, res, next) {
    if (req.session.role !== 'credit_manager') {
        return res.redirect("/");
    }
    next();
}

function checkApplicant(req, res, next) {
    if (req.session.role !== "applicant") {
        return res.redirect("/");
    }
    next();
}

function checkAdmin(req, res, next) {
    if (req.session.role !== 'admin') {
        return res.redirect("/");
    }
    next();
}

export {checkLogin, redirectIfLoggedIn, checkCredit, checkApplicant, checkAdmin};