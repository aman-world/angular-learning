app.controller('userController', function ($rootScope, $cookies, sessionService, userService) {
    var userCtrl = this;
    userCtrl.userList = [];
    userCtrl.sessionId = null;
    init();


    function init() {
        userCtrl.sessionId = sessionService.getSessionId();
        $rootScope.displayLogout = true;
        userService.getUserList(userCtrl.sessionId, function(err, response){
            if(err) {
                if(err.status === 401) {
                    $rootScope.deAuthenticateUser();
                }
            }
            userCtrl.userList = response.data;
        });
    }
});