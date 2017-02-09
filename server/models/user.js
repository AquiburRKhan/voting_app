var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({

        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String
        },
        password: {
            type: String
        }
});

userSchema.plugin(passportLocalMongoose,{usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);