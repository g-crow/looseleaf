var express = require('express');
var app = express();
//sets express(); as a variable so we can use in routes
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var usercontroller = require('./server/controllers/userController');
var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./server/models/user.js');
var Todo = require('./server/models/todo');
var todoscontroller = require('./server/controllers/todosController')
//requires dependencies


mongoose.connect(config.database);
app.set('superSecret', config.secret);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", config.webpack);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middleware allowing translation from .json to JavaScript objects and vice versa
app.use(morgan('dev'));


var apiRoutes = express.Router();

apiRoutes.post("/createuser", usercontroller.createuser);

apiRoutes.post("/createtodo", todoscontroller.createTodo);


apiRoutes.post('/authenticate', function(req, res) {


	//find the user
	User.findOne({
		username: req.body.username
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: "Authentication failed. User not found."});
		} else {
			if (user.password != req.body.password) {
				res.json({ success: false, message: "Authentication failed. Wrong password." });
			} else {
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 1440 //expires in 24 hours
				});
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

function requireAuthentication(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
}

apiRoutes.get('/', requireAuthentication, function(req, res) {
	res.json({ message: "We rock!" });
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/currentTodos', function(req, res) {
  Todo.find({}, function(err, todos) {
    res.json(todos);
  });
});





app.use('/api', apiRoutes);
app.listen(3002);
console.log('Magic');

//establishes which local port server is running on
