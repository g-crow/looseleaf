var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Journal', Schema ({
    user:'username',
    entries: { type: String, required: true},
    date: Date


}))
