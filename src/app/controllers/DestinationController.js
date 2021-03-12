const Province = require('../models/Province');
const Destination = require('../models/Destination');
const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
const multer = require('multer');





class DestinationController {

    //  [GET] /destination
    index(req, res, next) {
        // viet theo promise
        Destination.find({})
            .then(destinations => {

                // provinces: provinces
                // neu key = value ta co the viet 1 cai
                res.render('destinations/index', {
                    destinations: mutipleMongooseToObject(destinations)
                });
            })
            // .catch(err => next(err));
            .catch(next);
    }

    // [GET] /destination/create
    create(req, res, next) {
        res.render('destinations/createDestination')
    }


    // [POST] /destinations/store
    upload(req, res, next) {
        //res.json(req.body)
        // console.log(req.file, req.body)
        //res.json(req.files.filename)
        var filenames = req.files.map(function(file) {
            return file.filename;
        });

        const destination = Destination({
            name: req.body.name,
            description: req.body.description,
            img: filenames,
            area: req.body.area,
        });

        destination.save()
            .then(() => res.redirect('/me/stored/destinations'))
            .catch(err => {})

    };




    // [GET] /provinces/:slug
    showDetail(req, res, next) {
        Destination.findOne({ slug: req.params.slug })
            .then((destination) => {
                res.render('destinations/showDetail', {
                    destination: mongooseToObject(destination),
                });
                // res.json({ province });
            })
            .catch(next);


    }
}
module.exports = new DestinationController;