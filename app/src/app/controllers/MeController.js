const Province = require('../models/Province');
const Destination = require('../models/Destination');
const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');



class MeController {




    // [GET] /me/stored/provinces
    storedProvinces(req, res, next) {
        // gom 2 promise 
        Promise.all([Province.find({}), Province.countDocumentsDeleted()])
            .then(([provinces, deletedCount]) =>
                res.render('me/stored-provinces', {
                    deletedCount,
                    provinces: mutipleMongooseToObject(provinces),
                    username: req.session.userId,
                })
            )
            .catch(next)

        // count deleted
        // Province.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch((err) => {})


        // Province.find({})
        //     .then(provinces => res.render('me/stored-provinces', {
        //         provinces: mutipleMongooseToObject(provinces)
        //     }))
        //     .catch(next);
    }


    // [GET] /me/trash/provinces
    trashProvinces(req, res, next) {
        Province.findDeleted({})
            .then(provinces => res.render('me/trash-provinces', {
                provinces: mutipleMongooseToObject(provinces),
                username: req.session.userId,
            }))
            .catch(next);
    }


    // [GET] /me/stored/destinations
    storedDestination(req, res, next) {
        // gom 2 promise 
        Promise.all([Destination.find({}), Destination.countDocumentsDeleted()])
            .then(([destination, deletedCount]) =>
                res.render('me/stored-destinations', {
                    deletedCount,
                    destination: mutipleMongooseToObject(destination),
                    username: req.session.userId,
                })
            )
            .catch(next)
    }

    // [GET] /me/trash/destinations
    trashDestinations(req, res, next) {
        Destination.findDeleted({})
            .then(destinations => res.render('me/trash-destinations', {
                destinations: mutipleMongooseToObject(destinations),
                username: req.session.userId,
            }))
            .catch(next);
    }

}





module.exports = new MeController;