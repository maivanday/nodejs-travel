const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const multer = require('multer');

//[GET]/auth/register
router.get('/register', authController.showFormRegister);

//[GET]/auth/login
router.get('/login', authController.showFormLogin);

//[POST]auth/register
router.post('/register', authController.storeUser);

//[POST]auth/login
router.post('/login', authController.checkLogin);


module.exports = router;