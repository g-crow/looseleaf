var mongoose = require('mongoose');
//requires mongoose

var Schema = mongoose.Schema;
//connects Schema to MongoDB database

module.exports = mongoose.model('User', Schema ({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPass: { type: String, required: true},
}));
