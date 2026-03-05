const applicationPage = (req, res) => {
    res.render("forms/application/form.ejs", {title: "Application"})
}

export {applicationPage};