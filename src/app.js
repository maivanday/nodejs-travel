const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const port = 3000;
const app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));
//console.log('path', path.join(__dirname, 'resources\\views'));


app.use(morgan('combined'))
app.get('/', (req, res) => {

    res.render('home')
})
app.get('/new', (req, res) => {

    res.render('new')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})