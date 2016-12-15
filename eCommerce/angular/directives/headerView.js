app.directive('headerView', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/header.html',
        controller: 'headerController',
        controllerAs: 'headerCtrl'
    }
});