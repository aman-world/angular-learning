app.controller('userController', function ($rootScope, $cookies, sessionService, userService, commonService) {
    var userCtrl = this;
    userCtrl.userList = [];
    userCtrl.sessionId = null;
    userCtrl.reverseOrder = true;
    userCtrl.isAddNewUserError = false;
    userCtrl.addNewUserError = '';
    userCtrl.newUser = {};
    userCtrl.searchResult = [];
    userCtrl.getUserList = getUserList;
    userCtrl.orderBy = orderBy;
    userCtrl.addNewUser = addNewUser;
    init();

    function getUserList() {
        userService.getUserList(userCtrl.sessionId, function (err, response) {
            if (err) {
                console.log("err", err);
            }
            userCtrl.userList = response.data;
        });
    }

    function orderBy(x) {
        userCtrl.orderByParam = x;
        userCtrl.reverseOrder = !userCtrl.reverseOrder;
    }

    function addNewUser() {
        if (!userCtrl.newUser.email || !userCtrl.newUser.name) {
            userCtrl.isAddNewUserError = true;
            userCtrl.addNewUserError = 'Username or Email should not be empty!';
            return;
        }

        var email = userCtrl.newUser.email.trim().toLowerCase();
        var name = toTitleCase(userCtrl.newUser.name.trim());

        if (!isValidEmail(email)) {
            userCtrl.addNewUserError = 'Invalid email address!';
            userCtrl.isAddNewUserError = true;
            return;
        }

        var emailAlreadyExists = false;
        for (var i = 0; i < userCtrl.userList.length; ++i) {
            var user = userCtrl.userList[i];
            if (user.email === email) {
                emailAlreadyExists = true;
                break;
            }
        }
        if (emailAlreadyExists) {
            userCtrl.isAddNewUserError = true;
            userCtrl.addNewUserError = 'Email already in use!';
            return;
        }
        var user = {
            name: name,
            email: email
        };
        userCtrl.userList.push(user);
        console.log(userCtrl.userList);
        userCtrl.newUser = {};
    }

    function isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    function init() {
        userCtrl.sessionId = sessionService.getSessionId();
        commonService.populateCartIcon();
        commonService.displayHeaders();
        userCtrl.getUserList();
    }
});