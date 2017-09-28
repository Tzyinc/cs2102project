var dbcon = require('../dbcon/database.js')
const createUserPS = new dbcon.PS(
  'createUser',
  'INSERT INTO app_user(username,password) VALUES($1,$2)'
)

const authUserPS = new dbcon.PS(
  'authUser',
  'SELECT password FROM app_user WHERE username = $1'
)

// takes in unique username and (hashed) password and stores in database.
function createUser (req, res){
  var userDetails = req.body.data
  if (userDetails != null) {
    createUserPS.values = [ userDetails.username, userDetails.password ]
  }
  dbcon.db
    .any(createUserPS)
    .then(result => {
      res.json('success')
    })
    .catch(error => {
      res.json(error)
    })
}
// takes in username and (hashed) password and compares to existing username or passwor
function authUser (req, res){
  var userDetails = req.body.data
  if (userDetails != null) {
    authUserPS.values = [ userDetails.username ]
  }
  dbcon.db
    .one(authUserPS)
    .then(result => {
      res.json(result.password === userDetails.password)
    })
    .catch(error => {
      res.json(error)
    })
}

module.exports = {
  createUser: createUser,
  authUser: authUser
}
