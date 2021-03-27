const provinceRouter = require('./province');
const homeRouter = require('./home');
const destinationRouter = require('./destination');
const meRouter = require('./me');
const authRouter = require('./auth')



function route(app) {
    //[GET]/
    app.use('/', homeRouter);

    //[GET]/register
    app.use('/auth', authRouter);

    //[GET]/province
    app.use('/provinces', provinceRouter);

    //[GET]/destinations
    app.use('/destinations', destinationRouter);

    //[GET]/me
    app.use('/me', meRouter);


}

module.exports = route;