const express = require('express');
const router = express.Router();
//const homeController = require('../app/controllers/HomeController');
const homeController = require('../controllers/HomeController');

//const provinceController = require('../app/controllers/ProvinceController');
const provinceController = require('../controllers/ProvinceController');

//const authController = require('../app/controllers/AuthController');
const authController = require('../controllers/AuthController');

const multer = require('multer');



//upload file img 
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/uploads/imgProvinces')
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


//[GET]/province/create
router.get('/create', authController.requiresLogin, provinceController.create);

//[POST]/province/store
router.post('/store', authController.requiresLogin, upload.single('imgProvince'), provinceController.store);

//[GET]/province/:slug
router.get('/:slug', provinceController.show);

//[GET]/province/:id/edit
router.get('/:id/edit', authController.requiresLogin, authController.checkRole, provinceController.edit);

//[PATCH]/province/:id/restore
router.patch('/:id/restore', authController.requiresLogin, authController.checkRole, provinceController.restore);

//[POST]/province/:id
router.post('/handle-form-actions', authController.requiresLogin, provinceController.handleFormActions);

//[PUT]/province/:id
router.put('/:id', authController.requiresLogin, authController.checkRole, upload.single('imgProvince'), provinceController.update);

//[DELETE]/province/:id
router.delete('/:id', authController.requiresLogin, authController.checkRole, provinceController.destroy);

//[DELETE]/province/:id/force
router.delete('/:id/force', authController.requiresLogin, authController.checkRole, provinceController.forceDestroy);

//[GET]/province
router.get('/', provinceController.index);




module.exports = router;