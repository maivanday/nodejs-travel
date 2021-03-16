const Province = require('../models/Province');
const Destination = require('../models/Destination');
const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class HomeController {
    //[GET] /
    // async await 
    async show(req, res, next) {
        try {
            const provinces = await Province.find({})
            const destinations = await Destination.find({})
            res.render('home', {
                provinces: mongooseToObject(provinces),
                destinations: mutipleMongooseToObject(destinations),
            });
        }
        // res.json({ province });
        catch (next) {

        }
    }




}






module.exports = new HomeController;