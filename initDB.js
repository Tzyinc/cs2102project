var fs = require('fs')
var cred = JSON.parse(fs.readFileSync('credentials.json', 'utf8'))
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

const dropQuery = 'DROP TABLE IF EXISTS app_user, app_item;'
const createUserQuery =
  'CREATE TABLE app_user ' +
  '(uid           SERIAL        PRIMARY KEY,' +
  'imagesrc       TEXT,' +
  'username       TEXT          NOT NULL,' +
  'password       TEXT          NOT NULL,' +
  'isadmin        BOOLEAN       NOT NULL,' +
  'userRating     NUMERIC' +
  ');'
const createItemQuery =
  'CREATE TABLE app_item ' +
  '(iid           SERIAL        PRIMARY KEY,' +
  'uid            INTEGER       NOT NULL,' +
  'name           TEXT          NOT NULL,' +
  'imagesrc       TEXT          NOT NULL,' +
  'description    TEXT,' +
  'tags           TEXT,' +
  'minbid         NUMERIC       NOT NULL,' +
  'timeListed     DATE          NOT NULL,' +
  'status         BOOLEAN       NOT NULL,' +
  'location       TEXT          NOT NULL,' +
  'startDate      DATE,' +
  'endDate        DATE,' +
  'FOREIGN KEY (uid) REFERENCES app_user(uid)' +
  ');'
const createBiddingQuery = ''
const insertUserQuery = `INSERT INTO app_user VALUES (DEFAULT, 'asdimg', 'asdname', 'pw', TRUE, 100)`
db
  .tx(t => {
    // creating a sequence of transaction queries:
    var queries = []
    queries.push(t.any(dropQuery))
    queries.push(t.any(createUserQuery))
    queries.push(t.any(createItemQuery))
    queries.push(t.any(insertUserQuery))

    // returning a promise that determines a successful transaction:
    return t.batch(queries) // all of the queries are to be resolved;
  })
  .then(data => {
    console.log(data) // printing successful transaction output;
    pgp.end()
  })
  .catch(error => {
    console.log(error) // printing the error;
  })
