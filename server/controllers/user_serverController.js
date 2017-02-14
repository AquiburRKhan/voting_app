'use strict';

require('../models/user');

var mongoose = require('mongoose'),
    passport = require('passport'),
    FbAuth = require('../../config/nodeFirebase').fbAuth,
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

exports.loginUser = function *(req, res) {
    try{
        var user = yield FbAuth.signInWithEmailAndPassword(req.body.email,req.body.password);
        return res.status(200).json({msg: 'Logged In Successfully',user: req.user})
    } catch(error){
        return res.status(400).send({msg: 'Failed to login successfully'});
    }

};