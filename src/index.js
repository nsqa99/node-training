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

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    let randomFortune = fortuneCookies.getFortune();
    res.render('about', {
        fortune: randomFortune
    });
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