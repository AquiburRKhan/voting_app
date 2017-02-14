angular.module('app.controllers').controller('loginController', ['$scope','$location','$http','toastr','Auth',
    function ($scope,$location,$http,toastr,Auth) {

        $scope._authObj = Auth;

        $scope.login = function(user){
            if(!user){
                return;
            }
            $http.post('/users/login',user)
                .then(function (response) {
                    loginWithFirebase(user.email,user.password);
                }, function (error) {
                    toastr.error(error.data.msg,'ERROR');
                });
        };

        var loginWithFirebase = function(email, password){
            $scope._authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                console.log("Signed in");
                toastr.success("Signed in successfully",'SUCCESS');
                $location.path("/");
            }).catch(function(error) {
                console.error("Authentication failed:", error);
                toastr.error('"Authentication failed"','ERROR');
            });
        }
    }
]);
