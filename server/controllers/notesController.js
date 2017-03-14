var Notes = require('../models/notes')

function createNote(req, res){
	var note = new Notes ();
		  // note.user = config.usernamePlaceholder;
    	note.entry = req.body.entry;
    	note.date = Date.now();
      note.current = true

  note.save(function(err) {
    if(err) throw err;

    console.log('New Note');
    res.json({ success: true });
  });
}

function getUserNotes(req, res) {
  console.log(req.params.username)
  Notes.find({user: req.params.username}, function(err, notes) {
    res.json(notes);
  });
};

module.exports = {
  createNote,
  getUserNotes
}