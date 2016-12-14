var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var userList = require('./../data/userList.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var sessionId = req.get('sessionId');
    if(sessionId){
        var users = userList;
        return res.send(users);
    }
    var errorObject = {
        'message': "Unauthorized User"
    };
    return res.status(401).send(errorObject);
});

router.post('/login', function(req, res, next) {
  var reqObject = req.body;
  if(reqObject.email === "aman.gupta@mindstix.com" && reqObject.password === "123"){
      var user  = {
          email: 'aman.gupta@mindstix.com',
          name: 'Aman Gupta',
          company: 'Mindstix Software Labs',
          sessionId: uuid.v4()
      };
      return res.send(user);
  }
  var errorObject = {
    'message': "Invalid Credentials."
  };
  return res.status(400).send(errorObject);
});

module.exports = router;
