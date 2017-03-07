var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
var User = require('./models/user.js');
//requires dependencies

mongoose.connect('mongodb://localhost/Looseleaf');
//connects to MongoDB database

var app = express();
//sets express(); as a variable so we can use in routes

app.use(bodyParser.json());
//middleware allowing translation from .json to JavaScript objects and vice versa


app.post("/createuser", function (req, res){
	new User (
	var user = {
		firstName: req.body.firstName
    	lastName: req.body.lastName
    	email: req.body.email
    	username: req.body.username
    	password: req.body.password
	})
})



app.listen(3000);

//establishes which local port server is running on