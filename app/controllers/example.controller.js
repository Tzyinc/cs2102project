var fs = require('fs')
var cred = JSON.parse(fs.readFileSync(__dirname + '/../../credentials.json', 'utf8'))
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

function someExample (req, res) {
  db.any('SELECT * FROM app_user')
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
