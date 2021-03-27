const Province = require('../models/Province');
const Destination = require('../models/Destination');
const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class HomeController {
    //[GET] /
    // async await 
    async showHome(req, res, next) {
        // const provinces = await Province.find({});
        // const destinations = await Destination.find({});
        // res.json({ provinces, destinations });
        try {
            const provinces = await Province.find({});

            const destinations = await Destination.find({});

            res.render('home', {
                provinces: mutipleMongooseToObject(provinces),
                destinations: mutipleMongooseToObject(destinations),
            });
        }
        // res.json({ province });
        catch (next) {}

    }


}






module.exports = new HomeController;