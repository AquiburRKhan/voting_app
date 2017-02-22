angular.module('app.controllers').controller('votePetitionController', ['$scope','Auth','FBDataRef','$routeParams','$http','toastr','Auth','$location',
    function($scope,Auth,FBDataRef,$routeParams,$http,toastr) {

        $scope.petition = {};
        $scope.isPetitionsListLoaded = true;
        $scope.votedOnce = false;
        $scope.firebaseUser = $scope._authObj.$getAuth();
        var petitionFbObj = FBDataRef('petitions/'+$routeParams.petitionId);

        var checkUserLoggedIn = function(){
            if(!$scope.firebaseUser){
                toastr.info('Sign in to vote','Info');
            } else {
                if($scope.petition.voterEmails) {
                    if ($scope.petition.voterEmails.indexOf($scope.firebaseUser.email) != -1) {
                        $scope.votedOnce = true;
                    }
                }
            }
        };

        petitionFbObj.$loaded().then(function() {
            $scope.isPetitionsListLoaded = false;
            $scope.petition = petitionFbObj;
            $scope.percentageComplete = ($scope.petition.maxVotes/$scope.petition.voteCount)*100;
            checkUserLoggedIn();
        });

        petitionFbObj.$bindTo($scope, "petition"); // for three-way data binding

        $scope.voteForPetition = function(){

            $http.post('/petition/vote',$scope.petition)
                .then(function (response) {
                    $scope.votedOnce = true;
                    toastr.success(response.data.msg,'SUCCESS');
                }, function (error) {
                    toastr.error(error.data,'ERROR');
                });

        };

    }
]);
