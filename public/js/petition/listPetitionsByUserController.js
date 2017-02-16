'use strict';

angular.module('app.controllers').controller('listPetitionsByUserController', ['$scope','objectToArray','$location','$http','toastr',
    function ($scope,objectToArray,$location,$http,toastr) {

        $scope.petitionsList = [];
        $scope.isPetitionsListLoaded = false;

        var getUserPetitions = function(){
            $scope.isPetitionsListLoaded = true;
            $http.get('/petition/getuserpetitions')
                .then(function (response) {
                    $scope.isPetitionsListLoaded = false;
                    $scope.petitionsList = objectToArray(response.data.data);
                    toastr.success(response.data.msg,'SUCCESS');
                }, function (error) {
                    $scope.isPetitionsListLoaded = false;
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        };
        getUserPetitions();


    }
]);
