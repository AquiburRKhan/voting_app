angular.module('app.services',[]).factory('Auth', function ($firebaseAuth) {
    return $firebaseAuth();
})

    .factory('FBDataRef', function ($firebaseObject) {
        var ref = firebase.database();
        return function (petitionRef){
            var ref = firebase.database().ref(petitionRef);
            return $firebaseObject(ref);
        }
    });