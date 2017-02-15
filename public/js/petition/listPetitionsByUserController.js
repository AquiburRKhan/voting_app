'use strict';

angular.module('app.controllers').controller('listPetitionsByUserController', ['$scope','$location','$http','toastr','FBPetitionArrayRef',
    function ($scope,$location,$http,toastr,FBPetitionArrayRef) {

        $scope.petitionsList = FBPetitionArrayRef();
        $scope.isPetitionsListLoaded = false;

        $scope.petitionsList.$loaded()
            .then(function(list){
                $scope.isPetitionsListLoaded = true;
            }).catch(function(error){
                toastr.error("Something went wrong, please refresh the page",'ERROR');
            });





    }
]);
