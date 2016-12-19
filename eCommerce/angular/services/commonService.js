app.service('commonService', function ($rootScope, $cookies, httpService) {
    var service = this;
    service.populateCartIcon = populateCartIcon;
    service.displayHeaders = displayHeaders;
    service.hideHeaders = hideHeaders;

    function populateCartIcon() {
        var cartItems = $cookies.getObject('cartItems');
        console.log("cartItems ", cartItems);

        if(cartItems) {
          $rootScope.cartCount = cartItems.length;
          return;
        }
        $rootScope.cartCount = 0;
    }

    function displayHeaders() {
        $rootScope.displayLogout = true;
        $rootScope.displayOtherNav = true;
        $rootScope.displayCartIcon = true;
    }

    function hideHeaders() {
        $rootScope.displayLogout = false;
        $rootScope.displayOtherNav = false;
        $rootScope.displayCartIcon = false;
    }

});