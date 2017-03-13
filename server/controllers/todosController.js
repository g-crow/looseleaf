var Todo = require('../models/todo')

exports.createTodo = function (req, res){
	var todo = new Todo ();
		  // todo.username = ;
    	todo.entries = req.body.entries;
    	todo.date = Date.now();
      todo.current = true


  todo.save(function(err) {
    if(err) throw err;

    console.log('New To Do');
    res.json({ success: true });
  });
}
