const express = require('express');
const router = express.Router();
const provinceController = require('../app/controllers/ProvinceController');
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
router.get('/create', provinceController.create);

//[POST]/province/store
router.post('/store', upload.single('imgProvince'), provinceController.store);

//[GET]/province/:slug
router.get('/:slug', provinceController.show);

//[GET]/province/:id/edit
router.get('/:id/edit', provinceController.edit);


//[PATCH]/province/:id/restore
router.patch('/:id/restore', provinceController.restore);

//[POST]/province/:id
router.post('/handle-form-actions', provinceController.handleFormActions);

//[PUT]/province/:id
router.put('/:id', upload.single('imgProvince'), provinceController.update);

//[DELETE]/province/:id
router.delete('/:id', provinceController.destroy);

//[DELETE]/province/:id/force
router.delete('/:id/force', provinceController.forceDestroy);

//[GET]/province
router.get('/', provinceController.index);




module.exports = router;