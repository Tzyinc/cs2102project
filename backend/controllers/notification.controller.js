var dbcon = require('../dbcon/database.js')

const createNotiPS = new dbcon.PS(
  'createNoti',
  'INSERT INTO app_notification(username ,iid , timeCreated, type, isRead) VALUES($1,$2, now(), $3, FALSE)'
)

const checkNotiPS = new dbcon.PS(
  'checkNoti',
  'UPDATE app_notification SET isRead = true WHERE username =$1 AND iid = $2'
)

const getAllNotiPS = new dbcon.PS('getNoti', 'SELECT * FROM app_notification')

const getNotiByUserPS = new dbcon.PS(
  'getNotiByUser',
  'SELECT * FROM app_notification WHERE username = $1'
)

function createNotification(username, iid, type) {
  createNotiPS.values = [username, iid, type]
  return dbcon.db.none(createNotiPS)
}

function getNotification(req, res) {
  var notiValues = req.query
  if (notiValues.username != null) {
    getNotiByUserPS.values = [notiValues.username]
    dbcon.db
      .any(getNotiByUserPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    dbcon.db
      .any(getAllNotiPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  }
}

function checkNotificationRead(req, res) {
  var notiValues = req.body.data
  if (notiValues != null) {
    checkNotiPS.values = [notiValues.username, notiValues.iid]
    dbcon.db
      .none(checkNotiPS)
      .then(result => {
        res.json({ success: true })
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  } else {
    res.json({ error: 'No values found' })
  }
}
/*
CREATE TABLE app_notification ' +
'(username      TEXT,' +
'iid            INTEGER,' +
'timeCreated    TIMESTAMP       NOT NULL,' +
'type           TEXT            NOT NULL,' +
'isRead         BOOLEAN         NOT NULL,' +
'PRIMARY KEY (username, iid),' +
'FOREIGN KEY (iid) REFERENCES app_item(iid),' +
'FOREIGN KEY (username) REFERENCES app_user(username)' +
');'
*/

module.exports = {
  createNotification: createNotification,
  checkNotificationRead: checkNotificationRead,
  getNotification: getNotification
}
