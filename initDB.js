var fs = require('fs')
var cred = JSON.parse(fs.readFileSync('credentials.json', 'utf8'))
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

console.log(cn)
const dropQuery = 'DROP TABLE IF EXISTS app_user'
const createQuery = 'CREATE TABLE app_user ' +
    '(userId        SERIAL        PRIMARY KEY,' +
    'accesstoken    text,' +
    'expiresIn      text,' +
    'fbUserID       text          UNIQUE,' +
    'fbName         text,' +
    'fbImgUrl       text' +
    ');'
db.any(dropQuery)
  .then(result => {
    console.log('result', result) // print how many records were deleted;
    db.any(createQuery)
      .then(result => {
        console.log('result', result) // print how many records were deleted
        db.any("INSERT INTO app_user (accesstoken) VALUES ('asdf')")
          .then(result => {
            console.log('result', result) // print how many records were deleted
            pgp.end()
          })
          .catch(error => {
            console.log('ERROR:', error)
          })
      })
      .catch(error => {
        console.log('ERROR:', error)
      }
    )
  })
  .catch(error => {
    console.log('ERROR:', error)
  }
)
