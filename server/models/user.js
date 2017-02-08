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

// checking if password is valid
userSchema.methods.validPassword = function(password,cb) {
    return bcrypt.compare(password, this.password ,function(err, isMatch) {
        if (err) return cb(err);
        return cb(null, isMatch);
    });
};

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);