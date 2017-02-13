angular.module('app.services').factory('FBDataRef', function ($firebaseObject) {
    return function (){
        var ref = firebase.database().ref();

        return $firebaseObject(ref);
    }
});