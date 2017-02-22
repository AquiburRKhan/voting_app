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
                    loginWithFirebase(user.email,user.password);
                }, function (error) {
                    $scope.isLoading = false;
                    toastr.error('Email or Username already in use','ERROR');
                });
        }

        var loginWithFirebase = function(email, password){
            $scope._authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                $scope.isLoading = false;
                console.log("Signed up");
                toastr.success("Signed up successfully",'SUCCESS');
                $location.path("/");
            }).catch(function(error) {
                $scope.isLoading = false;
                console.error("Authentication failed:", error);
                toastr.error("Authentication failed",'ERROR');
            });
        }


    }
]);
