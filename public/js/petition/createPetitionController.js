angular.module('app.controllers').controller('createPetitionController', ['$scope','FBDataRef',
    function($scope,FBDataRef) {

        var petition = {};
        var _fbpetition = FBDataRef();

        $scope.createPetition = function(name){
            petition = {name: name, voteCount: 0};
            _fbpetition.petition = petition;
            _fbpetition.$save().then(function(ref) {
                console.log(ref);
            }, function(error) {
                console.log("Error:", error);
            });
        };



    }
]);
