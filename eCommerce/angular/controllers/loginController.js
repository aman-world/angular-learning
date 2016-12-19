app.controller('loginController', function ($rootScope, $cookies, $location, userService, sessionService, commonService) {
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
            $location.path('/users');
        });
    }

    function init(){
        if (sessionService.getSessionId()) {
            $location.path('/users');
        }
        loginCtrl.errorMessage = '';
        commonService.hideHeaders();

    }
});