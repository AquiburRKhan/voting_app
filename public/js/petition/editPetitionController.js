angular.module('app.controllers').controller('editPetitionController', ['$scope','FBDataRef','$routeParams','toastr','$location',
    function($scope,FBDataRef,$routeParams,toastr,$location) {

        $scope.petition = {};
        $scope.isPetitionsListLoaded = true;
        var petitionFbObj = FBDataRef('petitions/'+$routeParams.petitionId);

        petitionFbObj.$loaded().then(function() {
            $scope.isPetitionsListLoaded = false;
            $scope.petition = petitionFbObj;
            });

        petitionFbObj.$bindTo($scope, "petition"); // for three-way data binding

        $scope.deletePetition = function(){
            petitionFbObj.$remove().then(function(ref) {
                console.log(ref);
                toastr.success('Petition deleted','SUCCESS');
                window.history.back();
                // data has been deleted locally and in the database
            }, function(error) {
                console.log("Error:", error);
                toastr.error('Petition deletion failed','ERROR');
            });
        }
    }
]);
