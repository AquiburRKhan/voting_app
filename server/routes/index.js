var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    path = require('path');
var publicDirectoryPath = path.join(__dirname, '..' , '..' , 'public');

    /* GET home page. */
    router.route('/').get(function (req, res) {
            res.sendFile(publicDirectoryPath , + 'index.html');
    });
    /* GET home page. END */


    router.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/');
        });




//all routes goes here
require('./userRoutes')(router);

module.exports = router;
