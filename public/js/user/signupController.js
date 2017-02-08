angular.module('app.controllers').controller('signupController', ['$scope','$location','$http',
    function ($scope,$location, $http) {

        $scope.signup = function(user){
            if(!user){
                return;
            }
            console.log(user);
            $http.post('/users/create',user)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
        }


    }
]);