var express = require('express');
var passport = require('passport');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var favicon = require('serve-favicon');

var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://aquib17:database@ds157559.mlab.com:57559/surveydbbs23');

mongoose.connection.once('connected', function() {
    console.log("Connected to database")
});

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('rootPath', __dirname);
app.use(session({
    secret: 'VoteTodayNow',
    resave:true, saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

require('./config/passport')(app);

var routes = require('./server/routes/index');
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Something broke!');
});


module.exports = app;
