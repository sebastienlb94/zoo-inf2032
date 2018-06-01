const cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');
var httpContext = require('express-http-context');
var bodyParser = require('body-parser');


var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());
app.use(httpContext.middleware);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1", { useMongoClient: true }); // connect to our database

require('./routes')(app); // set route

app.get('/', function(req, res) {
    res.status(200).send('v0.1.0');
});

app.listen(process.env.PORT || 3000);