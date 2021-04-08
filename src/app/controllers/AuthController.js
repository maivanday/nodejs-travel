const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class AuthController {

    //[GET]/auth/register
    showFormRegister(req, res, next) {
        //res.render('auth/register', { layout: false })
        res.render('auth/register', )


    }

    //[GET]/auth/login
    showFormLogin(req, res, next) {
        res.render('auth/login')
    }


    //[POST]/auth/register
    storeUser(req, res, next) {
        const username = req.body.username
        User.findOne({ username: username })
            .then(data => {
                if (data) {
                    res.render('auth/register', { message: 'Email đã tồn tại' })
                } else {
                    const user = User({
                        username: req.body.username,
                        password: req.body.password,
                    });
                    user.password = bcrypt.hashSync(req.body.password, 10);
                    user.save()
                        .then(() => res.redirect('/auth/login'))
                        .catch(err => {})
                }
            })
            .catch(err => {
                res.json("error in server")
            })
    }

    //[POST]/auth/login
    checkLogin(req, res, next) {
        const username = req.body.username
        const password = req.body.password
            //const password = bcrypt.hashSync(req.body.password, 10)
            //res.json(password)
        User.findOne({
                username: username,
            })
            .then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.userId = user
                    res.redirect('/me')
                } else {;

                    res.render('auth/login', { message: 'Sai mật khẩu, vui lòng nhập lại' })
                }
            })
            .catch(err => {

                res.status(500).json('error in server')
            })
    }

    //check requiresLogin
    requiresLogin(req, res, next) {
        if (req.session && req.session.userId) {
            return next();
        } else {
            //res.send('Bạn cần đăng nhập');
            res.redirect('/auth/login')
        }
    }

    //logout
    logout(req, res, next) {
        req.session.destroy();
        res.redirect('/');
    }


    // check role
    checkRole(req, res, next) {
        const username = req.session.userId.username
            //const userAth = username.username
            //res.json({ username })
        User.findOne({
                username: username,
                roleId: 1
            })
            .then(data => {
                if (data) {
                    next();
                } else {
                    res.redirect('/auth/login')
                }
            })
            .catch(err => {
                res.status(500).json('error in server')
            })
    }

}
module.exports = new AuthController;