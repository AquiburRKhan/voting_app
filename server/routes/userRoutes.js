'use strict';

var userController = require('../controllers/user_serverController'),
    wrap = require('co-express');

module.exports = function(router){
    router.route('/users/create').post(userController.createUser);

};