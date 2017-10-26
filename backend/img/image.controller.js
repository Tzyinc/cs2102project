var dbcon = require('../dbcon/database.js')
var base64en = require('base64-img')
var path = require('path')

const updateItemImgSrcPS = new dbcon.PS(
  'updateItemImgSrc',
  'UPDATE app_item SET imagesrc = $1' + 'WHERE iid = $2'
)

const updateUserImgSrcPS = new dbcon.PS(
  'updateUserImgSrc',
  'UPDATE app_user SET imagesrc = $1' + 'WHERE username = $2'
)

function saveToFile(imageBin, iid) {
  console.log('saveToFileCalled')
  base64en.img(imageBin, path.join(__dirname, 'src'), iid, function(
    err,
    filepath
  ) {
    if (err) {
      console.error(err)
    } else {
      var filepaths = filepath.split(/\\|\/\/|\//)
      updateItemImgSrcPS.values = [filepaths.pop(), iid]
      dbcon.db.none(updateItemImgSrcPS).catch(error => {
        console.error(error)
      })
    }
  })
}

function saveUserToFile(imageBin, username) {
  console.log('saveUToFileCalled')
  console.log(imageBin, username)
  base64en.img(imageBin, path.join(__dirname, 'usrc'), username, function(
    err,
    filepath
  ) {
    if (err) {
      console.error(err)
    } else {
      var filepaths = filepath.split(/\\|\/\/|\//)
      updateUserImgSrcPS.values = [filepaths.pop(), username]
      dbcon.db.none(updateUserImgSrcPS).catch(error => {
        console.error(error)
      })
    }
  })
}

module.exports = {
  saveToFile: saveToFile,
  saveUserToFile: saveUserToFile
}
