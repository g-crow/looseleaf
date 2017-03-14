var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Goal', Schema ({
    user:String,
    entries: { type: String, required: true},
    date: Date,
    current: Boolean

}))
