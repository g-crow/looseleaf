var User = require('../models/user')
var config = require('../../config');
var jwt = require('jsonwebtoken');

function generateToken(user, res) {
  var token = jwt.sign(user, config.secret, {
    expiresIn: 1440 //expires in 24 hours
  });
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
}

exports.createuser = function (req, res){
	var user = new User ();
			user.firstName = req.body.firstName;
    	user.lastName = req.body.lastName;
    	user.email = req.body.email;
    	user.username = req.body.username;
    	user.password = req.body.password;
    	user.confirmPass = req.body.confirmPass;

  user.save(function(err) {
    if(err) console.log(err.message);
    console.log('User saved!');
		generateToken(user, res);
  });
}
