'use strict';

angular.module('app.controllers',[]).controller('homeController', ['$scope','$location','Auth','objectToArray','$http','toastr',
    function ($scope,$location,Auth,objectToArray,$http,toastr) {
        $scope._authObj = Auth;
        $scope.loggedIn = false;
        $scope.petitionsList = [];
        $scope.isPetitionsListLoaded = false;

        $scope._authObj.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });

        var getPetitions = function(){
            $scope.isPetitionsListLoaded = true;
            $http.get('/recentpetitions')
                .then(function (response) {
                    $scope.isPetitionsListLoaded = false;
                    $scope.petitionsList = objectToArray(response.data.data);
                }, function (error) {
                    $scope.isPetitionsListLoaded = false;
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        };
       getPetitions();




    }
]);

