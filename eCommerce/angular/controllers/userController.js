
app.controller('userController', ['userService', '$cookies', function (userService, $cookies) {
    var userCtrl = this;
    userCtrl.username = '';
    var username = $cookies.get("userName");
    userCtrl.username = username;
    userCtrl.user = {};
    userCtrl.user = userService.getUser();
}]);