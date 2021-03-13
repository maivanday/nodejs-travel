const express = require('express');
const router = express.Router();
const destinationController = require('../app/controllers/DestinationController');
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
router.get('/create', destinationController.create);

//[GET]/destinations/:id/edit
router.get('/:id/edit', destinationController.edit);


//[POST]/destinations/store
router.post('/store', upload.array('img[]', 12), destinationController.upload);

//[PUT]/province/:id
router.put('/:id', upload.array('img[]', 12), destinationController.update);

//[DELETE]/destinations/:id
router.delete('/:id', destinationController.destroy);

//[DELETE]/destinations/:id/force
router.delete('/:id/force', destinationController.forceDestroy);


//[PATCH]/destinations/:id/restore
router.patch('/:id/restore', destinationController.restore);

//[GET]/destinations/:slug
router.get('/:slug', destinationController.showDetail);






module.exports = router;