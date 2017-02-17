angular.module('app.controllers').controller('createPetitionController', ['$scope','$http','toastr','Auth','$location',
    function($scope, $http,toastr,Auth,$location) {

        var petition = {};
        $scope.isLoading = false;
        $scope._authObj = Auth;
        var firebaseUser = $scope._authObj.$getAuth();

        $scope.createPetition = function(name,description,maxVotes){
            $scope.isLoading = true;
            if(!description){
                description = 'No description given';
            }
            petition = {name: name, voteCount: 0, description: description,maxVotes: maxVotes};

            $http.post('/petition/create',petition)
                .then(function (response) {
                    $scope.isLoading = false;
                    $scope.name = '';
                    toastr.success(response.data.msg,'SUCCESS');
                    $location.path('/petition/'+firebaseUser.uid+'/list');
                }, function (error) {
                    $scope.isLoading = false;
                    console.log(error);
                    toastr.error(error.data.msg,'ERROR');
                });
        };

    }
]);
