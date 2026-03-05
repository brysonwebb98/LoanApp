const registerPage = (req, res) => {
    res.render("forms/register/form.ejs", {title: "Registration"})
}

export {registerPage};