const express = require('express');
const app = express();
const fortuneCookies = require('./utils/fortune');
const handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });

const PORT = 3000;


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
})

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    let randomFortune = fortuneCookies.getFortune();
    res.render('about', {
        fortune: randomFortune,
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate');
});

app.use((req, res, next) => {
    res.status(404).render('404');
});


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).render('500');
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`server started on port ${PORT}`);
})