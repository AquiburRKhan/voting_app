angular.module('app.controllers').controller('votePetitionController', ['$scope','FBDataRef','$routeParams','$http','toastr','Auth','$location',
    function($scope,FBDataRef,$routeParams,$http,toastr) {

        $scope.petition = {};
        $scope.isPetitionsListLoaded = true;
        var petitionFbObj = FBDataRef('petitions/'+$routeParams.petitionId);

        petitionFbObj.$loaded().then(function() {
            $scope.isPetitionsListLoaded = false;
            $scope.petition = petitionFbObj;
            $scope.percentageComplete = ($scope.petition.maxVotes/$scope.petition.voteCount)*100
        });

        petitionFbObj.$bindTo($scope, "petition"); // for three-way data binding

        $scope.voteForPetition = function(){
            $http.post('/petition/vote',$scope.petition)
                .then(function (response) {
                    toastr.success(response.data.msg,'SUCCESS');
                }, function (error) {
                    toastr.error('Something went wrong,your vote could not be saved ','ERROR');
                });

        };

    }
]);
