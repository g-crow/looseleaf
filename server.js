var express = require('express');
var app = express();
//sets express(); as a variable so we can use in routes
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session')

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./server/models/user.js');
//requires dependencies

mongoose.connect(config.database);
app.set('superSecret', config.secret);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware allowing translation from .json to JavaScript objects and vice versa
app.use(morgan('dev'));


app.get('/setup', function(req, res){
		var nick = new User ({
			firstName: 'nick',
		  lastName: 'buttkiss',
		  email: 'nick@buttkiss.com',
		  username: 'buttkissN',
		  password: 'password',
		  created_at: 10/2/12,
		  updated_at: 10/3/12
		});

		nick.save(function(err) {
			if(err) throw err;

			console.log('nick is a buttkiss');
			res.json({ success: true });
		});
});


// app.post("/createuser", function (req, res){
// 	new User (
// 	var user = {
// 		firstName: req.body.firstName
//     	lastName: req.body.lastName
//     	email: req.body.email
//     	username: req.body.username
//     	password: req.body.password
// 	})
// })



app.listen(3000);
console.log('Magic');

//establishes which local port server is running on
