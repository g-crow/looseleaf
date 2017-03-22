
var dev = process.env.DEV
module.exports = {
  'secret': 'ihatejavascript',
  'database': process.env.MONGODB_URI || 'mongodb://localhost/Looseleaf',
  'webpack': !DEV ? '/' : 'http://localhost:3000',
  'serverRoute':!DEV ? '/api' : 'http://localhost:3002/api',
  'deployed' : !DEV,
  port : process.env.PORT || 3002
  // 'usernamePlaceholder': "User's Name"
}
