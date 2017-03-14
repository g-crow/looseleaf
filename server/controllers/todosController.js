var Todo = require('../models/todo')
var config = require('../../Config');

function createTodo(req, res){
	var todo = new Todo ();
		  todo.username = config.usernamePlaceholder;
    	todo.entry = req.body.entry;
    	todo.date = Date.now();
      todo.current = true

  todo.save(function(err) {
    if(err) throw err;

    console.log('New To Do');
    res.json({ success: true });
  });
}

function getUserToDoList(req, res) {
  console.log(req.params.username)
  Todo.find({user: req.params.username}, function(err, todos) {
    res.json(todos);
  });
};

module.exports = {
  createTodo,
  getUserToDoList
}
