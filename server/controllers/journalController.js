var Journal = require('../models/journal')
var config = require('../../Config');

function createJournalEntry(req, res){
	var journalentry = new Journal ();
		  note.username = config.usernamePlaceholder;
    	journalentry.entry = req.body.entry;
    	journalentry.date = Date.now();
      journalentry.current = true

  journalentry.save(function(err) {
    if(err) throw err;

    console.log('New Journal Entry');
    res.json({ success: true });
  });
}

function getUserJournal(req, res) {
  console.log(req.params.username)
  Journal.find({user: req.params.username}, function(err, journal) {
    res.json(journal);
  });
};

module.exports = {
  createJournalEntry,
  getUserJournal
}
