app.controller('productController', function ($rootScope, $cookies, sessionService, productService, commonService) {
    var productCtrl = this;
    productCtrl.productList = [];
    productCtrl.cartList = [];
    productCtrl.searchResult = [];
    productCtrl.noSearchResultFound = false;
    productCtrl.getProductList = getProductList;
    productCtrl.addToCart = addToCart;
    init();

    function getProductList() {
        productService.getProductList(sessionService.getSessionId(), function (err, response) {
            if (err) {
                console.log("err", err);
            }
            productCtrl.productList = response.data;
        });
    }

    function addToCart(skuNo, qty) {
        var isProductExists = false;
        for (var i = 0; i < productCtrl.cartList.length; i++) {
            if (productCtrl.cartList[i].sku == skuNo) {
                isProductExists = true;
                break;
            }
        }
        if (isProductExists) {
             productCtrl.displayCartMessage = true;
             productCtrl.cartMessage = 'Product already added to the cart.';
             return;
            // return alert("Product already added to the cart");
        }
        productCtrl.cartList.push({sku: skuNo, qty:qty});
        $cookies.putObject("cartItems", productCtrl.cartList);
        commonService.populateCartIcon();
         productCtrl.displayCartMessage = true;
         productCtrl.cartMessage = 'Product successfully added to the cart.';
         return;
        // return alert("Product successfully added to the cart");
    }


    function init() {
        var cartItems = $cookies.getObject('cartItems');
        if (cartItems) {
            productCtrl.cartList = cartItems;
        }
        commonService.populateCartIcon();
        commonService.displayHeaders();
        productCtrl.getProductList();
    }
});