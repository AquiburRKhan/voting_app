var firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyDnKCHECMm7wonnqfNYBR8K5n-RzTanlrs",
    authDomain: "votingapplication-d4225.firebaseapp.com",
    databaseURL: "https://votingapplication-d4225.firebaseio.com",
    storageBucket: "votingapplication-d4225.appspot.com",
    messagingSenderId: "153664495303"
};

var FbApp = firebase.initializeApp(firebaseConfig);
module.exports = {fbDatabase: FbApp.database(),fbAuth: FbApp.auth()};