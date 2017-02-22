'use strict';

require('../models/user');

var mongoose = require('mongoose'),
    passport = require('passport'),
    FbAuth = require('../../config/nodeFirebase').fbAuth,
    co = require('co'),
    User = mongoose.model('User');

exports.createUser = function (req, res) {
    User.register(new User({ username : req.body.username, email: req.body.email }), req.body.password, function(err, user) {
        if (err) {
            return res.status(400).send({status:err.message});
        }else{

            req.login(user, function(err) {
                if (err) {
                    return res.status(400).send({status:err});
                }
            });

            co(function *(){
                yield FbAuth.createUserWithEmailAndPassword(req.body.email,req.body.password);
                return res.status(200).json({msg: 'Logged In Successfully',user: req.user})
            }).catch(function(coError){
                return res.status(400).send({status:coError.message});
            });
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