var dbcon = require('../dbcon/database.js')
var base64en = require('base64-img')
var path = require('path')

const updateItemImgSrcPS = new dbcon.PS(
  'updateItemImgSrc',
  'UPDATE app_item SET imagesrc = $1' + 'WHERE iid = $2'
)

function saveToFile(imageBin, iid){
  console.log('saveToFileCalled')
  base64en.img(imageBin, path.join(__dirname, 'src'), iid, function(
    err,
    filepath
  ){
    if (err) {
      console.error(err)
    } else {
      var filepaths = filepath.split(/\\|\/\/|\//)
      updateItemImgSrcPS.values = [ filepaths.pop(), iid ]
      dbcon.db.none(updateItemImgSrcPS).catch(error => {
        console.error(error)
      })
    }
  })
}

module.exports = {
  saveToFile: saveToFile
}
