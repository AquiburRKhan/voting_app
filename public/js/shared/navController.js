'use strict';

angular.module('app.controllers').controller('navController', ['$scope','$location','Auth','$http','toastr',
    function ($scope,$location,Auth,$http,toastr) {
        $scope.isNavCollapsed = true;
        $scope.pageUrl = $location.path();
        $scope._authObj = Auth;
        $scope.loggedIn = false;

        $scope.$on("$routeChangeStart", function () {
            $scope.pageUrl = $location.path();
        });

        $scope._authObj.$onAuthStateChanged(function(firebaseUser) {
            if(firebaseUser) {
                console.log('user signed in');
                $scope.firebaseUser = $scope._authObj.$getAuth();
                $scope.loggedIn = true;
            } else {
                console.log('user signed out');
                $scope.loggedIn = false;
            }
        });

        $scope.logout = function(){
            $http.get('/logout')
                .then(function (response) {
                    $scope._authObj.$signOut(); //logout from angularfire
                    toastr.success('Signed out successfully','SUCCESS');
                    $location.path('/');
                }, function (error) {
                    toastr.error('Failed to sign out','ERROR');
                });
        };

    }
]);
