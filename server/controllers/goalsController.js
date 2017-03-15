var Goal = require('../models/goal');
var config = require('../../Config');

function createGoal(req, res){
	console.log(req.body)
	var goal = new Goal ();
		  goal.username = req.body.username;
    	goal.entry = req.body.entry;
    	goal.date = Date.now();
      goal.current = true

  goal.save(function(err) {
    if(err) throw err;

    console.log('New Goal');
    res.json({ success: true });
  });
}

function getUserGoalList(req, res) {
  console.log(req.params.username)
  Goal.find({user: req.params.username}, function(err, goals) {
    res.json(goals);
  });
};

module.exports = {
  createGoal,
  getUserGoalList
}
