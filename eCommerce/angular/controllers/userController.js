app.controller('userController', ['userService', '$cookies', function (userService, $cookies) {
    var userCtrl = this;
    userCtrl.username = '';
    userCtrl.user = {};
    userCtrl.setUserName = setUserName;

    init();

    function setUserName() {
        if (userCtrl.username) return true;
        return false;
    }

    function init() {
        var username = $cookies.get("userName");
        userCtrl.username = username;
        userCtrl.user = userService.getUser();
    }
}]);