const displayHome = (req, res) => {
    res.render("index")
}
const displayInput = (req, res) => {
    res.render('input')
}
module.exports = {
    displayHome,
    displayInput
}