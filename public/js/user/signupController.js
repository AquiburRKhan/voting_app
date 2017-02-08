angular.module('app.controllers').controller('signupController', ['$scope','$location','$http','toastr',
    function ($scope,$location, $http, toastr) {

        $scope.signup = function(user){
            if(!user){
                return;
            }
            $http.post('/users/create',user)
                .then(function (response) {
                    toastr.success('Sign Up Successful','SUCCESS');
                    $location.path('/login')
                }, function (error) {
                    toastr.error('Email or Username already in use','ERROR');
                });
        }


    }
]);