var express = require('express');
var router = express.Router();
var productList = require('./../data/products.json');

/* GET product listing. */
router.get('/', function (req, res, next) {
    var sessionId = req.get('sessionId');
    if (sessionId) {
        var products = productList;
        return res.send(products);
    }
    var errorObject = {
        'message': "Unauthorized User"
    };
    return res.status(401).send(errorObject);
});

module.exports = router;
