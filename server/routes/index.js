var express = require('express'),
    router = express.Router(),
    path = require('path');

module.exports = function(){

var rootDirectory = path.join(__dirname, '..' , '..' , 'public');

    /* GET home page. */
    router.route('/')
        .get(function (req, res) {
            res.sendFile(rootDirectory , + 'index.html');
    });
    /* GET home page. END */

    router.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });




//all routes goes here
require('./userRoutes.js')(router);

}
