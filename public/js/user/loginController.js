angular.module('app.controllers').controller('loginController', ['$scope','$location','$http',
    function ($scope,$location, $http) {

        $scope.login = function(user){
            if(!user){
                return;
            }
            $http.post('/users/login',user)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                });
        }


    }
]);