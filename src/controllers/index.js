const homePage = (req, res) => {
    res.render('home', {title: 'Home'});
}

const aboutPage = (req, res) => {
    res.render('about', {title: "About Page"})
}

const processPage = (req,res) => {
    res.render('process', {title: "Process Page"});
}

export {homePage, aboutPage, processPage};