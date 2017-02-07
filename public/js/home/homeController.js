'use strict';

angular.module('app.controllers',[]).controller('homeController', ['$scope','$location',
    function ($scope,$location) {

        $scope.signup = function(){
            $location.path('/signup');
        }

        $scope.signin = function(){
            $location.path('/login');
        }



    }
]);

