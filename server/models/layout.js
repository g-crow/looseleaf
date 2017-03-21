var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var individualLayout = Schema ({{
    i: string,
    x: number,
    y: number,
    w: number,
    h: number,
}

module.exports = mongoose.model('Layout', Schema({
  layout: [individualLayout],
  username: {type: String, required: true, unique: true}
}) )
