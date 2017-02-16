angular.module('app.controllers').controller('editPetitionController', ['$scope','$routeParams','$http','toastr','$location',
    function($scope,$routeParams,$http,toastr,$location) {

        $scope.petition = {};
        $scope.isPetitionsListLoaded = false;
        console.log($routeParams);

        var getPetition = function(){
            $scope.isPetitionsListLoaded = true;

        };
        //getPetition();
    }
]);
