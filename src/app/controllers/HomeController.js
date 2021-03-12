class HomeController {
    //[GET] /
    show(req, res) {
        res.render('home');
    }



}






module.exports = new HomeController;