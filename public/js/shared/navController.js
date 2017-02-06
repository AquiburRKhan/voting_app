'use strict';

angular.module('app.controllers').controller('navController', ['$scope','$location',
    function ($scope,$location) {
        $scope.isNavCollapsed = true;
        $scope.pageUrl = $location.path();

        $scope.$on("$routeChangeSuccess", function () {
            $scope.pageUrl = $location.path();
        })


    }
]);
