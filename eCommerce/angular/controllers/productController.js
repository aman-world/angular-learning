app.controller('productController', function ($rootScope, sessionService, productService) {
    var productCtrl = this;
    productCtrl.productList = [];
    productCtrl.getProductList = getProductList;
    init();


    function getProductList() {
        productService.getProductList(sessionService.getSessionId(), function (err, response) {
            if (err) {
                console.log("err", err);
            }
            productCtrl.productList = response.data;
        });
    }

    function init() {
        $rootScope.displayLogout = true;
        $rootScope.displayOtherNav = true;
        productCtrl.getProductList();
    }
});