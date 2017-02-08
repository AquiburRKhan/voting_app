angular.module('app', ['ngRoute','ui.bootstrap','ngAnimate','ngTouch','app.controllers']).config([
        '$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

       $routeProvider.when('/', {
                redirectTo: '/home'
            }).when('/home', {
                templateUrl: 'views/home/home.html',
                controller: "homeController"
            }).when('/login', {
                templateUrl: 'views/user/login.html',
                controller: "loginController"
            }).when('/signup', {
                templateUrl: 'views/user/signup.html',
                controller: "signupController"
            }).otherwise({
                    redirectTo: '/404'
            });

        $locationProvider.html5Mode(false);
        }
    ]);
