
app.controller('loginController',['$http', '$cookies', function ($http, $cookies) {
    var loginCtrl = this;
    loginCtrl.isloginError = false;
    loginCtrl.errorMessage = '';
    loginCtrl.authenticateUser = function () {
        var credentials = {
            email: this.email,
            password: this.password
        };
        $http.post('/users/login', credentials).then(function(response){

        },function(err){
            loginCtrl.isloginError = true;
            loginCtrl.errorMessage = err.data.message;
            console.log(err.data.message);
        });

    }
}]);