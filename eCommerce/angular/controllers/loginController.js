
app.controller('loginController',['userService', '$cookies', '$location', function (userService, $cookies, $location) {
    var loginCtrl = this;
    loginCtrl.isloginError = false;
    loginCtrl.errorMessage = '';
    loginCtrl.authenticateUser = function () {
        var credentials = {
            email: this.email,
            password: this.password
        };
        userService.authenticateUser(credentials, function(err, response){
            if(err){
                loginCtrl.isloginError = true;
                loginCtrl.errorMessage = err.data.message;
            }
            $cookies.put('userName',response.data.name);
            $location.path('/user');
        });
    }
}]);