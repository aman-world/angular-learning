app.config(function($routeProvider){
    $routeProvider
        .when("/", {
            templateUrl : "views/login.html"
        })
        .when("/login", {
            templateUrl : "views/login.html"
        })
        .when("/user", {
            templateUrl : "views/user.html"
        });
});
