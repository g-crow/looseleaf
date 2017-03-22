var deployed = process.env.DEPLOYED ? true : false;

module.exports = {
  'secret': 'ihatejavascript',
  'database': process.env.MONGODB_URI || 'mongodb://localhost/Looseleaf',
  'webpack': deployed ? '/' : 'http://localhost:3000',
  'serverRoute':deployed ? '/' : 'http://localhost:3002/api',
  'deployed' : deployed
  // 'usernamePlaceholder': "User's Name"
}
