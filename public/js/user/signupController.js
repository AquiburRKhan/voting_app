angular.module('app.controllers').controller('signupController', ['$scope','$location','$http','toastr','Auth',
    function($scope,$location, $http, toastr,Auth) {

        $scope._authObj = Auth;
        $scope.isLoading = false;
        var firebaseUser = $scope._authObj.$getAuth();


        $scope.signup = function(user){
            $scope.isLoading = true;
            if(!user){
                $scope.isLoading = false;
                return;
            }
            if(firebaseUser){
                $scope.isLoading = false;
                toastr.error('You are already logged in,please logout to signup','ERROR');
                return;
            }
            $http.post('/users/create',user)
                .then(function (response) {
                    signupWithFirebase(user.email,user.password);
                }, function (error) {
                    $scope.isLoading = false;
                    toastr.error('Email or Username already in use','ERROR');
                });
        }

        var signupWithFirebase = function(email,password){
            $scope._authObj.$createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    console.log("User " + firebaseUser.uid + " created successfully!");
                    $scope.isLoading = false;
                    toastr.success('User created successfully','SUCCESS');
                    $location.path('/');
                }).catch(function(error) {
                $scope.isLoading = false;
                console.error("Error: ", error);
            });
        }


    }
]);
