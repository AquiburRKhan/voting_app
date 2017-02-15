var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    FbAuth = require('../../config/nodeFirebase').fbAuth
    path = require('path');
var publicDirectoryPath = path.join(__dirname, '..' , '..' , 'public');

    /* GET home page. */
    router.route('/').get(function (req, res) {
            res.sendFile(publicDirectoryPath , + 'index.html');
    });
    /* GET home page. END */

    router.route('/logout')
        .get(function (req, res) {
            req.logout(); //logout from passport
            FbAuth.signOut(); //logout from firebase from node
            res.redirect('/');
        });




//all routes goes here
require('./userRoutes')(router);
require('./petitionRoutes')(router);

module.exports = router;
