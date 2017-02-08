var User = require('../server/models/user');
var passport = require('passport');

module.exports = function(app) {

    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(passport.initialize());
    app.use(passport.session());


};