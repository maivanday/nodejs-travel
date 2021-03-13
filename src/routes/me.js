const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');




//[GET]/me/stored/provinces
router.get('/stored/provinces', meController.storedProvinces);

//[GET]/me/trash/provinces
router.get('/trash/provinces', meController.trashProvinces);

//[GET]me/stored/destinations
router.get('/stored/destinations', meController.storedDestination);

//[GET]/me/trash/destination
router.get('/trash/destinations', meController.trashDestinations);


module.exports = router;