var app = angular.module('eCommerce', ['ngRoute', 'ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'loginController',
            templateUrl: 'views/login.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html'
        })
        .when('/user', {
            templateUrl: 'views/user.html'
        })
        .otherwise('/', {
            templateUrl: 'views/login.html'
        });
});
