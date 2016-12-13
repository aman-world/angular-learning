var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var reqObject = req.body;
  if(reqObject.email === "aman.gupta@mindstix.com" && reqObject.password === "123"){
      var user  = {
          email: 'aman.gupta@mindstix.com',
          name: 'Aman Gupta',
          company: 'Mindstix Software Labs'
      };
      return res.send(user);
  }
  var errorObject = {
    'message': "Invalid Credentials."
  };
  return res.status(400).send(errorObject);
});

module.exports = router;
