var express = require('express');
var app = express();
//sets express(); as a variable so we can use in routes
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./config');
var usercontroller = require('./server/controllers/userController');
var jwt = require('jsonwebtoken');
var User = require('./server/models/user.js');
var Todo = require('./server/models/todo');
var todoscontroller = require('./server/controllers/todosController');
var Goal = require('./server/models/goal');
var goalscontroller = require('./server/controllers/goalsController');
var Notes = require('./server/models/notes');
var notescontroller = require('./server/controllers/notesController');
var Journal = require('./server/models/journal');
var journalcontroller = require('./server/controllers/journalController');
var Calendar = require('./server/models/calendar');
var calendarcontroller = require('./server/controllers/calendarController');
var layoutcontroller = require('./server/controllers/layoutcontroller')

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
console.log('Deployed???', config)
if (config.deployed){
  app.use(express.static('build'))
}
var apiRoutes = express.Router();

apiRoutes.post('/createuser', usercontroller.createuser);

apiRoutes.post('/createlayout', layoutcontroller.createLayout);

apiRoutes.post('/createtodo', todoscontroller.createTodo);

apiRoutes.post('/creategoal', goalscontroller.createGoal);

apiRoutes.post('/createnote', notescontroller.createNote);

apiRoutes.post('/createjournalentry', journalcontroller.createJournalEntry);

apiRoutes.post('/createcalendarevent', calendarcontroller.createCalendarEvent);

apiRoutes.put('/taskComplete/:taskId', todoscontroller.taskComplete);

apiRoutes.put('/savelayout', layoutcontroller.saveLayout);


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
				generateToken(user, res);
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
		return res.status(403).json({error: "No token found"});
	};
}
function generateToken(user, res) {
  var token = jwt.sign(user, app.get('superSecret'), {
    expiresIn: 1440 //expires in 24 hours
  });
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
}
apiRoutes.get('/verification', requireAuthentication, function(req, res) {
  res.json({ success: true, username: req.decoded['_doc'].username });
  console.log(req.decoded['_doc'].username);
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/currentTodos/:username', todoscontroller.getUserToDoList);

apiRoutes.get('/currentgoals/:username', goalscontroller.getUserGoalList);

apiRoutes.get('/currentNote/:username', notescontroller.getUserNotes);

apiRoutes.get('/JournalHistory/:username', journalcontroller.getUserJournal);

apiRoutes.get('/currentCalendar/:username', calendarcontroller.getUserCalendar);

apiRoutes.get('/getlayout/:username', layoutcontroller.getLayout);

app.use('/api', apiRoutes);
app.listen(process.env.PORT || config.port || 3002);
console.log('Magic');

//establishes which local port server is running on
