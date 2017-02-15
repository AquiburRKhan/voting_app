angular.module('app.controllers').controller('createPetitionController', ['$scope','$http','toastr','$location',
    function($scope, $http,toastr,$location) {

        var petition = {};
        $scope.isLoading = false;

        $scope.createPetition = function(name){
            $scope.isLoading = true;
            petition = {name: name, voteCount: 0};

            $http.post('/petition/create',petition)
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.name = '';
                    toastr.success(response.data.msg,'SUCCESS');
                    //$location.path();
                }, function (error) {
                    $scope.isLoading = false;
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        };

    }
]);
