var db = require('../dbcon/database.js')

function someExample(req, res) {
  db
    .any('SELECT * FROM app_user')
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
