app.service('httpService',function ($rootScope, $http, $cookies, $location, sessionService) {
    var service = this;
    service.doHttpRequest = doHttpRequest;
    service.logoutUser = logoutUser;

    init();

    function doHttpRequest(options, callback) {
        $http(options).then(function (response) {
            return callback(null, response);
        }, function (err) {
            if(err.status === 401) {
               return logoutUser();
            }
            if(err.status === 404) {
                return $location.path('/pageNotFound');
            }
            return callback(err, null);
        });
    }

    function logoutUser() {
        sessionService.removeSessionId();
        $cookies.remove('userName');
        $location.path('/login');
    }

    function init(){
        $rootScope.logoutUser = service.logoutUser;
    }

});