var dbcon = require('../dbcon/database.js')
const selectUserPS = new dbcon.PS('selectAllUsers', 'SELECT * FROM app_user')

function someExample(req, res){
  dbcon.db
    .any(selectUserPS)
    .then(result => {
      console.log('result', result) // print
      res.json(result)
    })
    .catch(error => {
      console.log('ERROR:', error)
      res.json('error')
    })
}

module.exports = {
  example: someExample
}
