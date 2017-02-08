'use strict';

require('../models/user');

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

exports.createUser = function (req, res) {
    User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
        if (err) {
            return res.status(400).send({status:err.message});
        }else{
            return res.json({user: user});
        }
    });

};