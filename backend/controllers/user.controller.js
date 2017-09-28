var dbcon = require('../dbcon/database.js')
const createUserPS = new dbcon.PS(
  'createUser',
  'INSERT INTO app_user(username,password) VALUES($1,$2)'
)
function createUser (req, res){
  var userDetails = req.body.data
  if (userDetails != null) {
    createUserPS.values = [ userDetails.username, userDetails.password ]
  }
  dbcon.db
    .any(createUserPS)
    .then(result => {
      console.log('result', result) // print
      res.json('success')
    })
    .catch(error => {
      console.log('ERROR:', error)
      res.json(error)
    })
}

module.exports = {
  createUser: createUser
}
