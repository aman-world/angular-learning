var app = angular.module('voiceDemo', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/voice.html',
            controller: 'voiceController',
            controllerAs: 'voiceCtrl'
        })
        .when('/record', {
            templateUrl: 'views/record.html',
            controller: 'recordController',
            controllerAs: 'recordCtrl'
        })
        .when('/stream', {
            templateUrl: 'views/stream.html',
            controller: 'streamController',
            controllerAs: 'streamCtrl'
        })
        .when('/pageNotFound', {
            templateUrl: 'views/error.html'
        })
        .otherwise({redirectTo: '/'});

});
