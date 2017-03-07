var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')

mongoose.connect('mongodb://localhost/Looseleaf');

var app = express();

app.use(bodyParser.json());


app.post("/createuser", function (req, res){
	var user = {
		firstName: req.body.firstName
    	lastName: req.body.lastName
    	email: req.body.email
    	username: req.body.username
    	password: req.body.password
	}
})



app.listen(3000);