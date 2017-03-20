var Todo = require('../models/todo')
var config = require('../../config');

function createTodo(req, res){
	var todo = new Todo ();
		  todo.username = req.body.username;
    	todo.entry = req.body.entry;
    	todo.date = Date.now();
      todo.current = true

  todo.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}

function getUserToDoList(req, res) {
  Todo.find({username: req.params.username}, function(err, todos) {
    res.json(todos);
  });
};

function taskComplete(req, res) {
	Todo.find({entry: req.params.entry}, function(err, todos) {
		res.json(todos);
	})
}

module.exports = {
  createTodo,
  getUserToDoList
}
