const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { mutipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

class AuthController {

    //[GET]/auth/register
    showFormRegister(req, res, next) {
        res.render('auth/register')
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
                    res.send('Tài khoản đã tồn tại')
                } else {
                    const user = User({
                        username: req.body.username,
                        password: req.body.password,
                    });
                    user.password = bcrypt.hashSync(req.body.password, 10);
                    user.save()
                        .then(() => res.redirect('/'))
                        .catch(err => {})
                }
            })

        .catch(err => {
            res.json("that bai")
        })
    }

    //[POST]/auth/login
    checkLogin(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        User.findOne({
                username: username,
                password: password
            })
            .then(user => {
                if (user) {
                    res.redirect('/'), {
                        user: mongooseToObject(user)
                    }
                } else {
                    res.send("Nhập không đúng")
                }

            })
            .catch(err => {
                res.status(500).json('Có lỗi phía server')
            })
    }



}
module.exports = new AuthController;