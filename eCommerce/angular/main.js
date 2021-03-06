var app = angular.module('eCommerce', ['ngRoute', 'ngCookies']);

app.run(function ($rootScope) {
    $rootScope.date = new Date();
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
        .when('/users', {
            templateUrl: 'views/user.html',
            controller: 'userController',
            controllerAs: 'userCtrl'
        })
        .when('/products', {
            templateUrl: 'views/product.html',
            controller: 'productController',
            controllerAs: 'productCtrl'
        })
        .when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'cartController',
            controllerAs: 'cartCtrl'
        })
        .when('/pageNotFound', {
            templateUrl: 'views/error.html'
        })
        .otherwise({redirectTo: '/'});

});
