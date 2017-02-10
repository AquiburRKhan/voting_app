angular.module('app.controllers').controller('signupController', ['$scope','$location','$http','toastr',
    function($scope,$location, $http, toastr) {

    var ref = firebase.database().ref();
    console.log(ref);
    // $scope._loginObj = $firebaseSimpleLogin(dataRef);

        $scope.signup = function(user){
            if(!user){
                return;
            }
            $http.post('/users/create',user)
                .then(function (response) {
                    $scope._loginObj.$createUser(user.email,user.password).then(
                      function(){
                        toastr.success('Sign Up Successful','SUCCESS');
                        $location.path('/login');
                      },
                      function(error){
                        toastr.error('Something went wrong, please try again','ERROR');
                      }
                    )
                }, function (error) {
                    toastr.error('Email or Username already in use','ERROR');
                });
        }


    }
]);
