var dbcon = require('../dbcon/database.js')

const createNotiPS = new dbcon.PS(
  'createNoti',
  'INSERT INTO app_notification(username ,iid , timeCreated, type, isRead) VALUES($1,$2, now(), $3, FALSE)'
)

const checkNotiPS = new dbcon.PS(
  'checkNoti',
  'UPDATE app_notification SET isRead = true WHERE notificationId =$1'
)

const getAllNotiPS = new dbcon.PS(
  'getNoti',
  'SELECT * FROM app_notification INNER JOIN app_item i ON n.iid = i.iid'
)

const getNotiByUserPS = new dbcon.PS(
  'getNotiByUser',
  'SELECT * FROM app_notification n INNER JOIN app_item i ON n.iid = i.iid  WHERE username = $1 ORDER BY timeCreated DESC'
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
    checkNotiPS.values = [notiValues.notificationID]
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

module.exports = {
  createNotification: createNotification,
  checkNotificationRead: checkNotificationRead,
  getNotification: getNotification
}
