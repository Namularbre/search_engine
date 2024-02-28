const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {join} = require("path");
require('dotenv').config();

const connectToDb = require('./utils/database');
const log = require('./middlewares/log');

connectToDb()
    .catch(error => console.error(error.message));

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());
app.use(log);

const webPageRouter = require('./routers/webPageRouter');
const apiWebPageRouter=  require('./routers/apiWebPageRouter');

app.use('/search', webPageRouter);
app.use('/api/search', apiWebPageRouter);

app.get('/', (req, res) => {
    res.render('templates/searchForm', {title: 'Search'});
});

const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
