app.service('userService', function (httpService) {
    var service = this;
    service.authenticateUser = authenticateUser;
    service.getUserList = getUserList;

    function authenticateUser(credentials, callback) {
        var options = {
            url: '/users/login',
            method: 'POST',
            headers: {},
            data: credentials
        };
        httpService.doHttpRequest(options, function (err, response) {
            if (err) {
                console.log(err.data.message);
                return callback(err, null);
            }
            console.log('Response: ', JSON.stringify(response.data));
            return callback(null, response);
        });
    }

    function getUserList(sessionId, callback) {
        var options = {
            url: '/users/',
            method: 'GET',
            headers: {}
        };
        if (sessionId) options.headers.sessionId = sessionId;

        httpService.doHttpRequest(options, function (err, response) {
            if (err) {
                console.log(err.data.message);
                return callback(err, null);
            }
            console.log('Response: ', JSON.stringify(response.data));
            return callback(null, response);
        });
    }
});