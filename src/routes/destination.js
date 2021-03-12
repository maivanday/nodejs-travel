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

//[GET]/destination
router.get('/', destinationController.index);

//[GET]/destination/create
router.get('/create', destinationController.create);

//[POST]/destination/store
router.post('/store', upload.array('img[]', 12), destinationController.upload);

//[GET]/destination/:slug
router.get('/:slug', destinationController.showDetail);




module.exports = router;