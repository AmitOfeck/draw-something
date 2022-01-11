var express = require('express');
var api = require('./routes/api');

var app = express();

require ('./configs/dataBase')

var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());
app.use(cors());

app.use('/games' , api);

app.listen(8000, () => {
    console.log('The server is listening')
});