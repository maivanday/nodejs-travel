const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const multer = require('multer');

//[GET]/auth/register
router.get('/register', authController.showFormRegister);

//[POST]auth/register
router.post('/register', authController.storeUser);

//[GET]/auth/login
router.get('/login', authController.showFormLogin);

//[POST]auth/login
router.post('/login', authController.checkLogin);


module.exports = router;