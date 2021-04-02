const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');
const authController = require('../app/controllers/AuthController');
const homeController = require('../app/controllers/HomeController');


//[GET]/me/stored/provinces
router.get('/stored/provinces', authController.requiresLogin, meController.storedProvinces);

//[GET]/me/trash/provinces
router.get('/trash/provinces', authController.requiresLogin, meController.trashProvinces);

//[GET]me/stored/destinations
router.get('/stored/destinations', authController.requiresLogin, meController.storedDestination);

//[GET]/me/trash/destination
router.get('/trash/destinations', authController.requiresLogin, meController.trashDestinations);

//[GET]/me
router.get('/', authController.requiresLogin, homeController.showHomeUser);


module.exports = router;