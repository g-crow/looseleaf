var Notes = require('../models/notes')
var config = require('../../config');

function createNote(req, res){
	var note = new Notes ();
		  note.username = req.body.username;
    	note.entry = req.body.entry;
    	note.date = Date.now();
      note.current = true

  note.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}

function getUserNotes(req, res) {
  Notes.find({username: req.params.username}, function(err, notes) {
    res.json(notes);
  });
};

module.exports = {
  createNote,
  getUserNotes
}
