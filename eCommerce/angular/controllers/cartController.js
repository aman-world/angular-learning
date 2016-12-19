app.controller('cartController', function ($rootScope, $cookies, sessionService, productService, commonService) {
    var cartCtrl = this;
    cartCtrl.cartList = [];
    cartCtrl.totalAmount = 0.00;
    cartCtrl.populateCartItems = populateCartItems;
    cartCtrl.getTotalAmount = getTotalAmount;
    cartCtrl.numberWithCommas = numberWithCommas;
    cartCtrl.removeFromCart = removeFromCart;
    init();

    function populateCartItems() {
        var cartItems = $cookies.getObject('cartItems');

        if (!cartItems) {
            return cartCtrl.cartList;
        }
        productService.getProductList(sessionService.getSessionId(), function (err, response) {
            if (err) {
                console.log("err", err);
            }
            var products = response.data;
            for (var i = 0; i < products.length; i++) {
                for (var j = 0; j < cartItems.length; j++) {
                    if (products[i].sku === cartItems[j].sku) {
                        products[i].qty = cartItems[j].qty;
                        cartCtrl.cartList.push(products[i]);
                    }
                }
            }
            cartCtrl.totalAmount = numberWithCommas(getTotalAmount());
        });
    }

    function removeFromCart(sku) {
        var cartItems = $cookies.getObject("cartItems");
        if (cartItems) {
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].sku === sku) {
                    cartItems.splice(i, 1);
                    cartCtrl.cartList = [];
                    cartCtrl.totalAmount = 0.00;
                    $cookies.remove("cartItems");
                    $cookies.putObject("cartItems", cartItems);
                    populateCartItems();
                    commonService.populateCartIcon();
                }
            }
        }
    }

    function getTotalAmount() {
        for (var i = 0; i < cartCtrl.cartList.length; i++) {
            cartCtrl.totalAmount += cartCtrl.cartList[i].qty * parseFloat(cartCtrl.cartList[i].price.replace(/\,/g,''));
        }
        return cartCtrl.totalAmount;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function init() {
        commonService.populateCartIcon();
        commonService.displayHeaders();
        cartCtrl.populateCartItems();
    }
});