var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var individualLayout = Schema ({
    i: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
})

module.exports = mongoose.model('Layout', Schema({
  layout: {type: [individualLayout], required: true},
  username: {type: String, required: true}
}) )
