angular.module('app.controllers').controller('createPetitionController', ['$scope','$http','toastr',
    function($scope, $http,toastr) {

        var petition = {};
        //var petitions = {};
        //var _fbpetitionRef = FBDataRef();

        $scope.createPetition = function(name){
            petition = {name: name, voteCount: 0};

            $http.post('/petition/create',petition)
                .then(function (response) {
                    $scope.name = '';
                    toastr.success(response.data.msg,'SUCCESS');
                }, function (error) {
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        };

    }
]);
