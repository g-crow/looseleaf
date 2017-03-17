var Journal = require('../models/journal')
var config = require('../../config');

function createJournalEntry(req, res){
	var journalentry = new Journal ();
		  journalentry.username = req.body.username;
    	journalentry.entry = req.body.entry;
    	journalentry.date = Date.now();
      journalentry.current = true

  journalentry.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}

function getUserJournal(req, res) {
  console.log(req.params.username)
  Journal.find({username: req.params.username}, function(err, journal) {
    res.json(journal);
  });
};

module.exports = {
  createJournalEntry,
  getUserJournal
}
