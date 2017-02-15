angular.module('app.services',[]).factory('Auth', function ($firebaseAuth) {
    return $firebaseAuth();
})

    .factory('FBDataRef', function ($firebaseObject) {
        var ref = firebase.database().ref();
        return function (){
            return $firebaseObject(ref);
        }
    })

    .factory('FBPetitionArrayRef', function ($firebaseArray) {
        var ref = firebase.database().ref();
        var petitionsRef = ref.child("petitions");
        return function (){
            return $firebaseArray(petitionsRef);
        }
    });