angular.module('app', ['app.services','app.controllers','firebase','ngRoute','ui.bootstrap','ngAnimate','ngTouch','toastr']).config([
        '$routeProvider','$locationProvider','toastrConfig', function ($routeProvider,$locationProvider,toastrConfig) {

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

        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: false,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            timeOut: 3000
        });
        }
    ]);
