const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const port = 3000;
const app = express();
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const multer = require('multer');
const session = require('express-session');
//const flash = require('express-flash-messages')

//connect DB 
db.connect();

//use express method-override
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log('path', path.join(__dirname, 'resources\\views'));


//khi post form , co the xem du lieu khi post. tich hop body-parser
//console.log(req.body);
app.use(express.urlencoded({
    extended: true,
}));

//express sesstion
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

//upload file with multer



app.use(express.json());

//flash messages
//app.use(flash())

//app.use(morgan('combined'))
// router
route(app);

app.listen(process.env.PORT, () => {
    console.log(` App listening at http://localhost:${port}`)
})