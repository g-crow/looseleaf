
var dev = true
module.exports = {
  'secret': 'ihatejavascript',
  'database': process.env.MONGODB_URI || 'mongodb://localhost/Looseleaf',
  'webpack': !dev ? '/' : 'http://localhost:3000',
  'serverRoute':!dev ? '/api' : 'http://localhost:3002/api',
  'deployed' : !dev,
  port : process.env.PORT || 3002
  // 'usernamePlaceholder': "User's Name"
}
