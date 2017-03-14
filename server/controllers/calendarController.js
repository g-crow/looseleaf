var Calendar = require('../models/calendar')
var config = require('../../Config');

function createCalendarEvent(req, res){
	var calendar = new Calendar ();
		  calendar.username = config.usernamePlaceholder;
    	calendar.entry = req.body.entry;
    	calendar.date = Date.now();
      calendar.current = true

  calendar.save(function(err) {
    if(err) throw err;

    console.log('New Calendar Event');
    res.json({ success: true });
  });
}

function getUserCalendar(req, res) {
  console.log(req.params.username)
  Calendar.find({user: req.params.username}, function(err, calendar) {
    res.json(calendar);
  });
};

module.exports = {
  createCalendarEvent,
  getUserCalendar
}
