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
  created_at: Date,
  updated_at: Date
}));

// Alternate syntax:

// var userSchema = new Schema({
//   firstName: { type: String, required: true},
//   lastName: { type: String, required: true},
//   email: {type: String, required: true},
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   created_at: Date,
//   updated_at: Date
// });
// //establishes data structure for a user, keys and props
//
// var User = mongoose.model('User', userSchema);
// //creates user constructor and ties it to Schema
//
// module.exports ='User';
//allows other files to use that constructor
