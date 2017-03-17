var Calendar = require('../models/calendar')
var config = require('../../config');

function createCalendarEvent(req, res){
	var calendar = new Calendar ();
		  calendar.username = req.body.username
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
  Calendar.find({username: req.params.username}, function(err, calendar) {
    res.json(calendar);
  });
};

module.exports = {
  createCalendarEvent,
  getUserCalendar
}
