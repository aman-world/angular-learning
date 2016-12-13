
app.controller('userController', ['userService', function (userService) {
    var userCtrl = this;
    userCtrl.user = userService.user;
}]);