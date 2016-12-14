app.service('userService', ['$http', function ($http) {
    var service = this;
    service.authenticateUser = function (credentials, callback) {
        $http.post('/users/login', credentials).then(function (response) {
            service.user = response.data;
            return callback(null, response);
        }, function (err) {
            console.log(err.data.message);
            return callback(err, null);
        });
    };
    service.getUserList = function (sessionId, callback) {
        $http.get('/users/',{
            headers: {
                sessionId: sessionId
            }
        }).then(function (response) {
            console.log('response',JSON.stringify(response.data));
            return callback(null, response);
        }, function (err) {
            console.log(err.data.message);
            return callback(err, null);
        });
    };
}]);