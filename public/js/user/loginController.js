angular.module('app.controllers').controller('loginController', ['$scope','userAuth','$location','$http','toastr','Auth',
    function ($scope,userAuth,$location,$http,toastr,Auth) {

        $scope._authObj = Auth;
        $scope.isLoading = false;

        $scope.login = function(user){
            $scope.isLoading = true;
            if(!user){
                $scope.isLoading = false;
                return;
            }
            $http.post('/users/login',user)
                .then(function (response) {
                    loginWithFirebase(user.email,user.password);
                }, function (error) {
                    var errMsg;
                    $scope.isLoading = false;

                    if(!error.data.msg){
                        errMsg = 'Failed to login';
                    } else{
                        errMsg = error.data.msg;
                    }
                    toastr.error(errMsg,'ERROR');
                });
        };

        var loginWithFirebase = function(email, password){
            $scope._authObj.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                $scope.isLoading = false;
                console.log("Signed in");
                userAuth.setUserEmail(email);
                toastr.success("Signed in successfully",'SUCCESS');
                $location.path("/");
            }).catch(function(error) {
                $scope.isLoading = false;
                console.error("Authentication failed:", error);
                toastr.error("Authentication failed",'ERROR');
            });
        }
    }
]);
