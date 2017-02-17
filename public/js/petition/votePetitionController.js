angular.module('app.controllers').controller('votePetitionController', ['$scope','userAuth','FBDataRef','$routeParams','$http','toastr','Auth','$location',
    function($scope,userAuth,FBDataRef,$routeParams,$http,toastr) {

        //TODO: save user in browser using session or other way, and remove userAuth service and its usages

        $scope.petition = {};
        $scope.isPetitionsListLoaded = true;
        $scope.votedOnce = false;
        var userEmail = userAuth.getUserEmail();
        var petitionFbObj = FBDataRef('petitions/'+$routeParams.petitionId);

        if(!userEmail){
            toastr.info('Sign in to vote','Info');
        }

        petitionFbObj.$loaded().then(function() {
            $scope.isPetitionsListLoaded = false;
            $scope.petition = petitionFbObj;
            $scope.percentageComplete = ($scope.petition.maxVotes/$scope.petition.voteCount)*100
        });

        petitionFbObj.$bindTo($scope, "petition"); // for three-way data binding


        console.log(userEmail);
        console.log($scope.petition);

        $scope.voteForPetition = function(){



            if($scope.petition.voterEmails.indexOf(userEmail) != -1){
                toastr.info('You cannot vote twice','Info');
                $scope.votedOnce = true;
            }

            $http.post('/petition/vote',$scope.petition)
                .then(function (response) {
                    toastr.success(response.data.msg,'SUCCESS');
                }, function (error) {
                    toastr.error(error.data,'ERROR');
                });

        };

    }
]);
