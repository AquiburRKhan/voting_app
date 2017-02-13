angular.module('app.services',[]).factory('Auth', function ($firebaseAuth) {
    return $firebaseAuth();
});