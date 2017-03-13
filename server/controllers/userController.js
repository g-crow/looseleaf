var User = require('../models/user')

exports.createuser = function (req, res){
	var user = new User ();
		  user.firstName = req.body.firstName;
    	user.lastName = req.body.lastName;
    	user.email = req.body.email;
    	user.username = req.body.username;
    	user.password = req.body.password;
    	user.confirmPass = req.body.confirmPass;


  user.save(function(err) {
    if(err) throw err;

    console.log('User saved!');
    res.json({ success: true });
  });
}
