var Journal = require('../models/journal')
var config = require('../../config');

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd}
if(mm<10) {
    mm='0'+mm}
today = mm+'/'+dd+'/'+yyyy;
return today}

function createJournalEntry(req, res){
	var journalentry = new Journal ();
		  journalentry.username = req.body.username;
    	journalentry.entry = getDate() + " - " + req.body.entry;
    	journalentry.date = Date.now();
      journalentry.current = true

  journalentry.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}

function getUserJournal(req, res) {
  //console.log(req.params.username)
  Journal.find({username: req.params.username}, function(err, journal) {
    res.json(journal);
  });
};

module.exports = {
  createJournalEntry,
  getUserJournal
}
