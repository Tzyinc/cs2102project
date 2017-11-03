var fs = require('fs')
var cred = JSON.parse(fs.readFileSync('credentials.json', 'utf8'))
const pgp = require('pg-promise')()
const cn = cred.dbcred
const db = pgp(cn)

const dropQuery =
  'DROP TABLE IF EXISTS app_user, app_item, app_bidding, app_loan, app_notification, app_tag_count, app_tag_relation;'
const createUserQuery =
  'CREATE TABLE app_user ' +
  '(username      TEXT,' +
  'imagesrc       TEXT,' +
  'password       TEXT          NOT NULL,' +
  'isadmin        BOOLEAN       NOT NULL      DEFAULT false,' +
  'userRating     NUMERIC       NOT NULL      DEFAULT 0,' +
  'PRIMARY KEY (username)' +
  ');'

const createItemQuery =
  'CREATE TABLE app_item ' +
  '(iid           SERIAL,' +
  'owner_username TEXT       NOT NULL,' +
  'name           TEXT          NOT NULL,' +
  'imagesrc       TEXT          NOT NULL,' +
  'description    TEXT,' +
  'minbid         NUMERIC       NOT NULL,' +
  'timeListed     TIMESTAMP          NOT NULL,' +
  'status         BOOLEAN       NOT NULL,' +
  'location       TEXT          NOT NULL,' +
  'startDate      TIMESTAMP,' +
  'endDate        TIMESTAMP,' +
  'PRIMARY KEY (iid),' +
  'FOREIGN KEY (owner_username) REFERENCES app_user(username) ON DELETE CASCADE' +
  ');'

const createBiddingQuery =
  'CREATE TABLE app_bidding ' +
  '(bidder_username    TEXT,' +
  'iid                 INTEGER,' +
  'price               NUMERIC       NOT NULL,' +
  'time           TIMESTAMP,' +
  'PRIMARY KEY (bidder_username, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid) ON DELETE CASCADE,' +
  'FOREIGN KEY (bidder_username) REFERENCES app_user(username) ON DELETE CASCADE' +
  ');'

const createLoanQuery =
  'CREATE TABLE app_loan ' +
  '(borrower_username    TEXT,' +
  'iid                   INTEGER,' +
  'price                 NUMERIC       NOT NULL,' +
  'PRIMARY KEY (borrower_username, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid) ON DELETE CASCADE,' +
  'FOREIGN KEY (borrower_username) REFERENCES app_user(username) ON DELETE CASCADE' +
  ');'

const createNotiQuery =
  'CREATE TABLE app_notification ' +
  '(nid SERIAL,' +
  'username       TEXT            NOT NULL,' +
  'iid            INTEGER         NOT NULL,' +
  'timeCreated    TIMESTAMP       NOT NULL,' +
  'type           TEXT            NOT NULL,' +
  'isRead         BOOLEAN         NOT NULL,' +
  'PRIMARY KEY (nid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid) ON DELETE CASCADE,' +
  'FOREIGN KEY (username) REFERENCES app_user(username) ON DELETE CASCADE' +
  ');'

const createTagRelationQuery =
  'CREATE TABLE app_tag_relation ' +
  '(tag      TEXT,' +
  'iid     INTEGER,' +
  'PRIMARY KEY (tag, iid),' +
  'FOREIGN KEY (iid) REFERENCES app_item(iid) ON DELETE CASCADE' +
  ');'

const createTagCountQuery =
  'CREATE TABLE app_tag_count ' +
  '(tag      TEXT,' +
  'count     INTEGER   NOT NULL,' +
  'PRIMARY KEY (tag)' +
  ');'

const insertUserQuery = `INSERT INTO app_user VALUES ('qwer', 'defaultProfile.jpg', '$2a$08$zc0NLLSrVblCjAQpAD5Ll.P9eEFwN3YUJUHlxwTb9Z1RhJApKjFhO', true, 100)`
const insertUserQuery2 = `INSERT INTO app_user VALUES ('bob99', 'defaultProfile.jpg', '$2a$08$zc0NLLSrVblCjAQpAD5Ll.P9eEFwN3YUJUHlxwTb9Z1RhJApKjFhO', true, 100)`
const insertUserQuery3 = `INSERT INTO app_user VALUES ('charlie11', 'defaultProfile.jpg', '$2a$08$zc0NLLSrVblCjAQpAD5Ll.P9eEFwN3YUJUHlxwTb9Z1RhJApKjFhO', true, 100)`
const insertItemQuery =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('qwer','Database Introduction','book.png', 49.99 ,now(), TRUE,'NUS','2017-11-30', '2017-12-30')`
const insertItemQuery2 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('qwer','Book','book.png', 19.99 ,now(), TRUE,'Buona Vista','2017-11-30', '2017-12-20')`
const insertItemQuery3 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('bob99','English book','book.png', 49.99 ,now(), TRUE,'Seng Kang','2017-11-25', '2018-12-30')`
const insertItemQuery4 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('bob99','Chinese Book','book.png', 39.99 ,now(), TRUE,'Pasir Ris','2017-11-22', '2018-10-20')`
const insertItemQuery5 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('bob99','Japanese book','book.png', 99.99 ,now(), TRUE,'Clementi','2017-11-30', '2018-01-30')`
const insertItemQuery6 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('charlie11','Calculus Book','book.png', 40 ,now(), TRUE,'Clementi','2017-11-19', '2017-12-30')`
const insertItemQuery7 =
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, startdate, enddate) ' +
  `VALUES('charlie11','Magic book','book.png', 199.99 ,now(), TRUE,'Clementi','2017-12-05', '2018-12-30')`

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
    queries.push(t.any(createTagCountQuery))
    queries.push(t.any(createTagRelationQuery))
    queries.push(t.any(insertUserQuery))
    queries.push(t.any(insertUserQuery2))
    queries.push(t.any(insertUserQuery3))
    queries.push(t.any(insertItemQuery))
    queries.push(t.any(insertItemQuery2))
    queries.push(t.any(insertItemQuery3))
    queries.push(t.any(insertItemQuery4))
    queries.push(t.any(insertItemQuery5))
    queries.push(t.any(insertItemQuery6))
    queries.push(t.any(insertItemQuery7))
    queries.push(t.any('SELECT * FROM app_item'))

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
