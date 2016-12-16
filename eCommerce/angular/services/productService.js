app.service('productService', function (httpService) {
    var service = this;
    service.getProductList = getProductList;

    function getProductList(sessionId, callback) {
        var options = {
            url: '/products/',
            method: 'GET',
            headers: {}
        };
        if (sessionId) options.headers.sessionId = sessionId;

        httpService.doHttpRequest(options, function (err, response) {
            if (err) {
                console.log(err.data.message);
                return callback(err, null);
            }
            console.log('Response: ', JSON.stringify(response.data));
            return callback(null, response);
        });
    }
});