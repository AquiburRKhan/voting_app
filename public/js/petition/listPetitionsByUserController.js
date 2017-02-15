'use strict';

angular.module('app.controllers').controller('listPetitionsByUserController', ['$scope','$location','$http','toastr',
    function ($scope,$location,$http,toastr) {

        $scope.petitionsList = [];
        $scope.isPetitionsListLoaded = false;


        //$scope.petitionsList.$loaded()
        //    .then(function(list){
        //
        //    }).catch(function(error){
        //        toastr.error("Something went wrong, please refresh the page",'ERROR');
        //    });

        var getUserPetitions = function(){
            $scope.isPetitionsListLoaded = true;
            $http.get('/getUserPetitions')
                .then(function (response) {
                    $scope.isPetitionsListLoaded = false;
                   // $scope.petitionsList
                    toastr.success(response.data.msg,'SUCCESS');
                    $location.path('/petition/'+firebaseUser.uid+'/list');
                }, function (error) {
                    $scope.isPetitionsListLoaded = false;
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        }
       // getUserPetitions();


//TODO: finish backend


    }
]);
