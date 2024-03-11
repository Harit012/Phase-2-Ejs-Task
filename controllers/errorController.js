exports.getError = (req, res, next) => {
    res.render("error",{ pageTitle: "Error Page"});
}