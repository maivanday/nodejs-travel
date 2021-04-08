const express = require('express');
const router = express.Router();
const destinationController = require('../app/controllers/DestinationController');
const authController = require('../app/controllers/AuthController');

const multer = require('multer');
//const upload = multer({ dest: '../app/public/uploads/imgDestinations/' })


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/uploads/imgDestinations')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        console.log(file);
        if (file.mimetype == "image/bmp" || file.mimetype == "image/png" || file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
})

//[GET]/destinations
router.get('/', destinationController.index);

//[GET]/destinations/create
router.get('/create', authController.requiresLogin, destinationController.create);

//[GET]/destinations/:id/edit
router.get('/:id/edit', authController.requiresLogin, authController.checkRole, destinationController.edit);


//[POST]/destinations/store
router.post('/store', authController.requiresLogin, upload.array('img[]', 12), destinationController.upload);

//[PUT]/destinations/:id
router.put('/:id', authController.requiresLogin, upload.array('img[]', 12), destinationController.update);

//[DELETE]/destinations/:id
router.delete('/:id', authController.requiresLogin, authController.checkRole, destinationController.destroy);

//[DELETE]/destinations/:id/force
router.delete('/:id/force', authController.requiresLogin, authController.checkRole, destinationController.forceDestroy);

//[POST]/destination/:id
router.post('/handle-form-actions', authController.requiresLogin, authController.checkRole, destinationController.handleFormActions);


//[PATCH]/destinations/:id/restore
router.patch('/:id/restore', authController.requiresLogin, destinationController.restore);

//[GET]/destinations/:slug
router.get('/:slug', destinationController.showDetail);





module.exports = router;