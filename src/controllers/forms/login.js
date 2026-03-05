const loginPage = (req, res) => {
    res.render('forms/login/form.ejs', {title: "Login Page"})
}

export {loginPage};