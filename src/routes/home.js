const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');


//[GET]/province
router.get('/', homeController.show);


module.exports = router;