var dbcon = require('../dbcon/database.js')
var imageSaver = require('../img/image.controller.js')

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

const updatePwPS = new dbcon.PS(
  'updatePw',
  'UPDATE app_user SET password = $1 WHERE username = $2'
)

const getUserPS = new dbcon.PS(
  'getUser',
  'SELECT username, imagesrc, isadmin, userRating FROM app_user WHERE username = $1'
)

const getAllUserPS = new dbcon.PS(
  'getAllUser',
  'SELECT username, imagesrc, isadmin, userRating FROM app_user'
)

const removeUserImgSrcPS = new dbcon.PS(
  'removeUserImgSrc',
  "UPDATE app_user SET imagesrc = ''" + 'WHERE username = $1'
)

// takes in unique username and (hashed) password and stores in database.
function createUser(req, res){
  var userDetails = req.body.data
  if (userDetails != null) {
    createUserPS.values = [ userDetails.username, userDetails.password ]
  }
  dbcon.db
    .any(createUserPS)
    .then(result => {
      res.json({success: true})
    })
    .catch(error => {
      res.json(error)
    })
}

// get all details of user
function getUserDetails(req, res){
  var userDetails = req.query
  if (userDetails.username != null) {
    getUserPS.values = [ userDetails.username ]
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

function updateUserImg(req, res){
  var userDetails = req.body.data
  //console.log(userDetails)
  if (userDetails != null) {
    if (userDetails.imageBin === null || userDetails.imageBin === '') {
      //console.log('entered here')
      removeUserImgSrcPS.values = [ userDetails.username ]
      dbcon.db
        .one(removeUserImgSrcPS)
        .then(result => {
          res.json({success: true})
        })
        .catch(error => {
          res.json(error)
        })
    } else {
      imageSaver.saveUserToFile(userDetails.imageBin, userDetails.username)
      res.json({success: true})
    }
  }
}

// get all usernames (to be used in router)
function getAllUsernames(){
  return dbcon.db.any(getUserNamesPS)
}

// get user details given username (to be used in router)
function getUsernamePw(username){
  if (username != null) {
    getUsernamePwPS.values = [ username ]
  }
  return dbcon.db.one(getUsernamePwPS)
}

function updatePassword(req, res){
  var userDetails = req.query
  getUsernamePw(userDetails.username)
    .then(result => {
      if (
        userDatails.username === result.username &&
        userDetails.oldPassword === result.password
      ) {
        updatePwPS.values = [ userDetails.password, userDetails.username ]
        dbcon.db
          .none(updatePwPS)
          .then(result => {
            res.json({success: true})
          })
          .catch(error => {
            res.json(error)
          })
      } else {
        res.json({error: "old password doesn't match"})
      }
    })
    .catch(error => {
      console.error(error)
      res.json(error)
    })
}

module.exports = {
  createUser: createUser,
  getUserDetails: getUserDetails,
  getAllUsernames: getAllUsernames,
  getUsernamePw: getUsernamePw,
  updateUserImg: updateUserImg,
  updatePassword: updatePassword
}
