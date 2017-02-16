angular.module('app', ['app.services','app.controllers','firebase','ngRoute','ui.bootstrap','ngAnimate','ngTouch','toastr']).config([
        '$routeProvider','$locationProvider','toastrConfig', function ($routeProvider,$locationProvider,toastrConfig) {

        var authRequired = {
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $routeChangeError (see below)
                return Auth.$requireSignIn();
            }]
        };

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
            }).when('/petition/create', {
                templateUrl: 'views/petition/createPetition.html',
                controller: "createPetitionController",
                resolve: authRequired
            }).when('/petition/:petitionId/edit', {
                templateUrl: 'views/petition/editPetition.html',
                controller: "editPetitionController",
                resolve: authRequired
            }).when('/petition/:fbUserId/list', {
                templateUrl: 'views/petition/listPetitionsByUser.html',
                controller: "listPetitionsByUserController",
                resolve: authRequired
            }).when('/petition/listAll', {
                templateUrl: 'views/petition/listPetitions.html',
                controller: "listPetitionsController",
                resolve: authRequired
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
    ]).run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/home");
        }
    });
}]);