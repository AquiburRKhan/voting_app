angular.module('app.controllers').controller('loginController', ['$scope','$location','$http','toastr','$firebaseAuth',
    function ($scope,$location,$http,toastr,$firebaseAuth) {

        $scope._authObj = $firebaseAuth();

        $scope.login = function(user){
            if(!user){
                return;
            }
            $http.post('/users/login',user)
                .then(function (response) {
                    loginWithFirebase(user.email,user.password);
                }, function (error) {
                    toastr.error('"Unauthorized"','ERROR');
                });
        }

        var loginWithFirebase = function(email, password){
            $scope._authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
                toastr.success("Signed in successfully",'SUCCESS');
                $location.path("/");
            }).catch(function(error) {
                console.error("Authentication failed:", error);
                toastr.error('"Authentication failed"','ERROR');
            });
        }


    }
]);
