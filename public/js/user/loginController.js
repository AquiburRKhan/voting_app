angular.module('app.controllers').controller('loginController', ['$scope','$location','$http',
    function ($scope,$location, $http) {

        $scope.login = function(user){
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