var fs = require('fs')
var path = require('path')
var cred = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../credentials.json'), 'utf8')
)
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

module.exports = db
