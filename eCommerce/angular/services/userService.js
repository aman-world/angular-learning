app.service('userService',['$http', function($http){
    var service = this;
    service.user = null;
    service.authenticateUser = function (credentials, callback) {
        $http.post('/users/login', credentials).then(function(response){
            service.user = response.data;
            return callback(null, response);
        },function(err){
            console.log(err.data.message);
            return callback(err, null);
        });
    };
}]);