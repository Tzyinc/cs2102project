var dbcon = require('../dbcon/database.js')

const getUserNamesPS = new dbcon.PS(
  'getUserNames',
  'SELECT username FROM app_user'
)

const createUserPS = new dbcon.PS(
  'createUser',
  'INSERT INTO app_user(username,password) VALUES($1,$2)'
)

const getUsernamePwPS = new dbcon.PS(
  'getUsernamePwPS',
  'SELECT username, password FROM app_user WHERE username = $1'
)

const getUserPS = new dbcon.PS(
  'getUser',
  'SELECT username, imagesrc, isadmin, userRating FROM app_user WHERE username = $1'
)

const getAllUserPS = new dbcon.PS(
  'getAllUser',
  'SELECT username, imagesrc, isadmin, userRating FROM app_user'
)

// takes in unique username and (hashed) password and stores in database.
function createUser(req, res) {
  var userDetails = req.body.data
  if (userDetails != null) {
    createUserPS.values = [userDetails.username, userDetails.password]
  }
  dbcon.db
    .any(createUserPS)
    .then(result => {
      res.json({ success: true })
    })
    .catch(error => {
      res.json(error)
    })
}

// get all details of user
function getUserDetails(req, res) {
  var userDetails = req.query
  if (userDetails.username != null) {
    getUserPS.values = [userDetails.username]
    dbcon.db
      .one(getUserPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    dbcon.db
      .any(getAllUserPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  }
}

// get all usernames (to be used in router)
function getAllUsernames() {
  return dbcon.db.any(getUserNamesPS)
}

// get user details given username (to be used in router)
function getUsernamePw(username) {
  if (username != null) {
    getUsernamePwPS.values = [username]
  }
  return dbcon.db.one(getUsernamePwPS)
}

module.exports = {
  createUser: createUser,
  getUserDetails: getUserDetails,
  getAllUsernames: getAllUsernames,
  getUsernamePw: getUsernamePw
}
