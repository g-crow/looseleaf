var Layout = require('../models/layout')
var config = require('../../config');

function createLayout(req, res) {
  var layout = new Layout ();
    layout.layout = [
      {i: '1', x: 0, y: 0, w: 3, h: 3},
      {i: '2', x: 3, y: 0, w: 3, h: 3},
      {i: '3', x: 6, y: 0, w: 3, h: 9},
      {i: '4', x: 0, y: 3, w: 6, h: 3},
      {i: '5', x: 0, y: 6, w: 6, h: 3 }
    ];
    layout.username = req.body.username;


    layout.save(function(err) {
      if(err) throw err;
      res.json({ success: true });
    });
}

function saveLayout(req, res){
    Layout.update({username: req.body.username}, {$set: {layout: req.body.layouts}},
      function (err, layout) {
      res.json(layout);
    });
}

function getLayout(req, res) {
  Layout.findOne({username: req.params.username},
  function(err, layout) {
    res.json(layout.layout)
  });
}


module.exports = {
  createLayout,
  saveLayout,
  getLayout
}
