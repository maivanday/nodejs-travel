const Province = require('../models/Province');
const Destination = require('../models/Destination');
const User = require('../models/User');
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

    //[GET] /me
    // async await 
    async showHomeUser(req, res, next) {
        try {
            const provinces = await Province.find({});
            const destinations = await Destination.find({});
            res.render('home', {
                provinces: mutipleMongooseToObject(provinces),
                destinations: mutipleMongooseToObject(destinations),
                username: req.session.userId,
            });
            console.log(username)
        }

        // res.json({ province });
        catch (next) {}

    }

}






module.exports = new HomeController;