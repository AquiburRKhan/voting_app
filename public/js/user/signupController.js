angular.module('app.controllers').controller('signupController', ['$scope','$location','$http','toastr','Auth',
    function($scope,$location, $http, toastr,Auth) {

        $scope._authObj = Auth;

        $scope.signup = function(user){
            if(!user){
                return;
            }
            $http.post('/users/create',user)
                .then(function (response) {
                    signupWithFirebase(user.email,user.password);
                }, function (error) {
                    toastr.error('Email or Username already in use','ERROR');
                });
        }

        var signupWithFirebase = function(email,password){
            $scope._authObj.$createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    console.log("User " + firebaseUser.uid + " created successfully!");
                    toastr.success('User created successfully','SUCCESS');
                    $location.path('/');
                }).catch(function(error) {
                console.error("Error: ", error);
            });
        }


    }
]);
