var fs = require('fs')
var cred = JSON.parse(fs.readFileSync('credentials.json', 'utf8'))
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

const dropQuery =
  'DROP TABLE IF EXISTS app_user, app_item, app_bidding, app_loan, app_notification;'
const createUserQuery =
  'CREATE TABLE app_user ' +
  '(uid           SERIAL,' +
  'imagesrc       TEXT,' +
  'username       TEXT          NOT NULL,' +
  'password       TEXT          NOT NULL,' +
  'isadmin        BOOLEAN       NOT NULL      DEFAULT false,' +
  'userRating     NUMERIC,' +
  'PRIMARY KEY (uid)' +
  ');'

const createItemQuery =
  'CREATE TABLE app_item ' +
  '(iid           SERIAL,' +
  'owner_uid      INTEGER       NOT NULL,' +
  'name           TEXT          NOT NULL,' +
  'imagesrc       TEXT          NOT NULL,' +
  'description    TEXT,' +
  'tags           TEXT,' +
  'minbid         NUMERIC       NOT NULL,' +
  'timeListed     TIMESTAMP          NOT NULL,' +
  'status         BOOLEAN       NOT NULL,' +
  'location       TEXT          NOT NULL,' +
  'startDate      TIMESTAMP,' +
  'endDate        TIMESTAMP,' +
  'PRIMARY KEY (iid),' +
  'FOREIGN KEY (owner_uid) REFERENCES app_user(uid)' +
  ');'

const createBiddingQuery =
  'CREATE TABLE app_bidding ' +
  '(bidder_uid    INTEGER,' +
  'iid            INTEGER,' +
  'price          INTEGER       NOT NULL,' +
  'time           TIMESTAMP,' +
  'PRIMARY KEY (bidder_uid, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid),' +
  'FOREIGN KEY (bidder_uid) REFERENCES app_user(uid)' +
  ');'

const createLoanQuery =
  'CREATE TABLE app_loan ' +
  '(borrower_uid    INTEGER,' +
  'iid              INTEGER,' +
  'price            INTEGER       NOT NULL,' +
  'PRIMARY KEY (borrower_uid, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid),' +
  'FOREIGN KEY (borrower_uid) REFERENCES app_user(uid)' +
  ');'

const createNotiQuery =
  'CREATE TABLE app_notification ' +
  '(uid           INTEGER,' +
  'iid            INTEGER,' +
  'timeCreated    TIMESTAMP       NOT NULL,' +
  'type           TEXT            NOT NULL,' +
  'isRead         BOOLEAN         NOT NULL,' +
  'PRIMARY KEY (uid, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid),' +
  'FOREIGN KEY (uid) REFERENCES app_user(uid)' +
  ');'

const insertUserQuery = `INSERT INTO app_user VALUES (DEFAULT, 'asdimg', 'asdname', 'pw', DEFAULT, 100)`
db
  .tx(t => {
    // creating a sequence of transaction queries:
    var queries = []
    queries.push(t.any(dropQuery))
    queries.push(t.any(createUserQuery))
    queries.push(t.any(createItemQuery))
    queries.push(t.any(createBiddingQuery))
    queries.push(t.any(createLoanQuery))
    queries.push(t.any(createNotiQuery))
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
