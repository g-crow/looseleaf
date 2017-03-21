var Layout = require('../models/layout')
var config = require('../../config');

function saveLayout(req, res){
    layout: req.params.layout,
    username: req.props.username
}

  layout.save(function(err) {
    if(err) throw err;
    res.json({ success: true });
  });
}


function getUserLayout(req, res) {
  Artboard.find({username: req.params.username}, function(err, notes) {
    res.json(artboard);
  });
};


module.exports = {
  createNote,
  getUserNotes
}
