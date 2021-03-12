const provinceRouter = require('./province');
const homeRouter = require('./home');
const destinationRouter = require('./destination');
const meRouter = require('./me');


function route(app) {
    //[GET]/
    app.use('/', homeRouter);

    //[GET]/province
    app.use('/provinces', provinceRouter);

    //[GET]/destinations
    app.use('/destinations', destinationRouter);

    //[GET]/me
    app.use('/me', meRouter);


}

module.exports = route;