angular.module('app.services',[]).factory('Auth', function ($firebaseAuth) {
    return $firebaseAuth();
})

    .factory('FBDataRef', function ($firebaseObject) {
        var ref = firebase.database().ref();
        return function (){
            return $firebaseObject(ref);
        }
    });