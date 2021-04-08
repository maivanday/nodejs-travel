const Province = require('../models/Province');
const Destination = require('../models/Destination');
const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');
const multer = require('multer');




class ProvinceController {

    // [GET] /provinces/:slug
    //promise
    //  show(req, res, next) {
    //     Province.findOne({ slug: req.params.slug })
    //         .then((province) => {
    //             res.render('provinces/show', {
    //                 province: mongooseToObject(province),
    //             });
    //             // res.json({ province });
    //         })
    //         .catch(next);
    // }


    // [GET] /provinces/:slug
    // async await 
    async show(req, res, next) {
        try {
            const province = await Province.findOne({ slug: req.params.slug })
            const destination = await Destination.find({ area: req.params.slug })
            res.render('provinces/show', {
                province: mongooseToObject(province),
                destination: mutipleMongooseToObject(destination),
                username: req.session.userId,
            });

        }
        // res.json({ province });
        catch (next) {

        }
    }



    // [GET] /provinces/create
    create(req, res, next) {
        res.render('provinces/create', { username: req.session.userId })
    }

    // [GET] /provinces/:id/edit
    edit(req, res, next) {
        Province.findById(req.params.id)
            .then(province => res.render('provinces/edit', {
                province: mongooseToObject(province),
                username: req.session.userId
            }))
            .catch(next);

    }

    //[PUT] /provinces/:id/edit
    update(req, res, next) {
        // Province.updateOne({ _id: req.params.id }, req.body)
        //     .then(() => res.redirect('/me/stored/provinces'))
        //     .catch(next);

        //if no choose new file
        if (!req.file) {
            Province.updateOne({ _id: req.params.id }, {
                    // name: req.body.name,
                    description: req.body.description,

                })
                .then(() => res.redirect('/me/stored/provinces'))
                .catch(next);
        } else {
            Province.updateOne({ _id: req.params.id }, {
                    description: req.body.description,
                    img: req.file.filename,
                    slug: req.body.name

                })
                .then(() => res.redirect('/me/stored/provinces'))
                .catch(next);
        }
    }

    //[DELETE] /provinces/:id
    destroy(req, res, next) {
        Province.delete({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /provinces/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Province.delete({ _id: { $in: req.body.provinceIds } }, )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;

            default:
                res.json({ messenger });
        }
    }




    //[DELETE] /provinces/:id/force
    forceDestroy(req, res, next) {
        Province.deleteOne({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }


    //[PATCH] /provinces/:id/restore
    restore(req, res, next) {
        Province.restore({ _id: req.params.id }, )
            .then(() => res.redirect('back'))
            .catch(next);
    }



    // [POST] /provinces/store
    store(req, res, next) {
        // const province = new Province(req.body);
        // province.save()
        //     .then(() => res.redirect('/me/stored/provinces'))
        //     .catch(err => {})
        //  res.send(req.file.filename)

        const province = Province({
            name: req.body.name,
            description: req.body.description,
            img: req.file.filename,

        });

        province.save()
            .then(() => res.redirect('/me/stored/provinces'))
            .catch(err => {})
    }



    //  [GET] /province
    index(req, res, next) {
        // viet theo promise
        Province.find({})
            .then(provinces => {
                // provinces: provinces
                // neu key = value ta co the viet 1 cai
                res.render('provinces/index', {
                    provinces: mutipleMongooseToObject(provinces),
                    username: req.session.userId,
                });
            })
            // .catch(err => next(err));
            .catch(next);
    }
}







module.exports = new ProvinceController;