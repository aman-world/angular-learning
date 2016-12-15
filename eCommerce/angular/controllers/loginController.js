app.controller('loginController', function ($rootScope, $cookies, $location, userService, sessionService) {
    var loginCtrl = this;
    loginCtrl.isloginError = false;
    loginCtrl.errorMessage = '';
    loginCtrl.authenticateUser = authenticateUser;
    init();

    function authenticateUser() {
        var credentials = {
            email: this.email,
            password: this.password
        };
        userService.authenticateUser(credentials, function (err, response) {
            if (err) {
                loginCtrl.isloginError = true;
                loginCtrl.errorMessage = err.data.message;
            }
            $cookies.put('userName', response.data.name);
            sessionService.setSessionId(response.data.sessionId);
            $rootScope.displayLogout = true;
            $location.path('/users');
        });
    }

    function init(){
        sessionService.removeSessionId();
        $cookies.remove('userName');
        loginCtrl.errorMessage = '';
        $rootScope.displayLogout = false;
    }
});