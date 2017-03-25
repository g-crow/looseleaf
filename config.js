module.exports = {
  'secret': 'ihatejavascript',
  'database': 'mongodb://localhost/Looseleaf',
  'webpack': 'http://localhost:3000',
  'serverRoute': 'http://localhost:3002/api',
}




// Config for heroku deployment:
// var dev = process.env.NODE_ENV === 'development'
// module.exports = {
//   'secret': 'ihatejavascript',
//   'database': process.env.MONGODB_URI || 'mongodb://localhost/Looseleaf',
//   'webpack': !dev ? '/' : 'http://localhost:3000',
//   'serverRoute':!dev ? '/api' : 'http://localhost:3002/api',
//   'deployed' : !dev,
//   port : process.env.PORT || 3002
// }
