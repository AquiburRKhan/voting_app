'use strict';

angular.module('app.controllers',[]).controller('homeController', ['$scope','$location','Auth',
    function ($scope,$location,Auth) {
        $scope._authObj = Auth;
        $scope.loggedIn = false;

        $scope._authObj.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });




    }
]);

