var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports = mongoose.model('Notes', Schema ({
    user:'username',
    entry: { type: String, required: true},
    date: Date


}))
