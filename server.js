var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var router = express.Router();
var session = require('express-session');
// var logger = require("./shared/lib/logger");
// var requestLogger = require("./shared/lib/requestLogger");
// const expressRequestId = require('express-request-id')();
// app.use(expressRequestId);
var jwt = require("jsonwebtoken");



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

const fileUpload = require('express-fileupload');



var passport = require('passport');

console.log(__dirname);
var config = require("./config/config");
mongoose.connect(config.local.db);

var fs = require("fs");
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
});



var User = mongoose.model("User");
var Admin = mongoose.model("Admin");
require('./config/passport')(passport);
app.use(express.static(path.join(__dirname, "/sample")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})


app.use(passport.initialize());
app.use(passport.session());
//app.use(requestLogger);


app.use(fileUpload());
//Bootstrap routes
var routes = require('./config/routes')(app, passport);
app.use('/', routes);
app.use(router);


app.listen(3200);
console.log("server is listening on port 3200");