var dbcon = require('../dbcon/database.js')
const selectUserPS = new dbcon.PS('selectAllUsers', 'SELECT * FROM app_user')
var tagController = require('../controllers/tag.controller.js')

function someExample(req, res){
  /*
  dbcon.db
    .any(selectUserPS)
    .then(result => {
      console.log('result', result) // print
      res.json(result)
    })
    .catch(error => {
      console.error('ERROR:', error)
      res.json('error')
    })
    */

  tagController
    .addTagCount('someTag')
    .then(result => {
      res.json({success: true})
    })
    .catch(error => {
      res.json(error)
    })
}

module.exports = {
  example: someExample
}
