var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Journal', Schema ({
    username: String,
    entry: { type: String, required: true },
    date: Date


}))
