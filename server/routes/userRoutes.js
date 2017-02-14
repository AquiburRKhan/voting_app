'use strict';

var userController = require('../controllers/user_serverController'),
    passport = require('passport'),
    wrap = require('co-express');

module.exports = function(router){
    router.route('/users/create').post(userController.createUser);

    router.route('/users/login').post(passport.authenticate('local'),wrap(userController.loginUser));
};