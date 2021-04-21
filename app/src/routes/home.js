const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');


//[GET]/
router.get('/', homeController.showHome);

//[GET]/:page
router.get('/page', homeController.showHome);

module.exports = router;