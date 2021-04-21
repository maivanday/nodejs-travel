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
                    destinations: mutipleMongooseToObject(destinations),
                    username: req.session.userId,
                });
            })
            // .catch(err => next(err));
            .catch(next);
    }

    // [GET] /destination/create
    create(req, res, next) {
        res.render('destinations/createDestination', { username: req.session.userId })
    }

    // [GET] /destinations/:id/edit
    edit(req, res, next) {
        Destination.findById(req.params.id)
            .then(destination => res.render('destinations/editDestination', {
                destination: mongooseToObject(destination),
                username: req.session.userId
            }))
            .catch(next);

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

    // [GET] /destinations/:slug
    showDetail(req, res, next) {
        Destination.findOne({ slug: req.params.slug })
            .then((destination) => {
                res.render('destinations/showDetail', {
                    destination: mongooseToObject(destination),
                    username: req.session.userId,
                });
                // res.json({ province });
            })
            .catch(next);
    };

    //[DELETE] /destinations/:id
    destroy(req, res, next) {
        Destination.delete({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[DELETE] /destinations/:id/force
    forceDestroy(req, res, next) {
        Destination.deleteOne({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /destinations/:id/restore
    restore(req, res, next) {
        Destination.restore({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[PUT] /destinations/:id/edit
    update(req, res, next) {
        //if no choose new file
        if (!filenames) {
            Destination.updateOne({ _id: req.params.id }, {
                    name: req.body.name,
                    description: req.body.description,
                    area: req.body.area,
                })
                .then(() => res.redirect('/me/stored/destinations'))
                .catch(next);
        } else {
            var filenames = req.files.map(function(file) {
                return file.filename;
            });
            Destination.updateOne({ _id: req.params.id }, {
                    name: req.body.name,
                    description: req.body.description,
                    img: filenames,
                    area: req.body.area,
                })
                .then(() => res.redirect('/me/stored/destinations'))
                .catch(next);
        }
    }



    //[POST] /destinations/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Destination.delete({ _id: { $in: req.body.destinationIds } }, )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ messenger });
        }
    }
}
module.exports = new DestinationController;