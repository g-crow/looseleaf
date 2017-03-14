var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Calendar', Schema ({
    username: String,
    entry: { type: String, required: true},
    date: Date,
    current: Boolean

}))
