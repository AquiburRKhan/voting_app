angular.module('app.controllers').controller('loginController', ['$scope','$location','$http','toastr',
    function ($scope,$location,$http,toastr) {



        $scope.login = function(user){
            if(!user){
                return;
            }
            $http.post('/users/login',user)
                .then(function (response) {
                    toastr.success(response.data.result,'SUCCESS');
                    $location.path("/");
                }, function (error) {
                    toastr.error('"Unauthorized"','ERROR');
                });
        }


    }
]);
