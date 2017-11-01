var dbcon = require('../dbcon/database.js')

const createNotiPS = new dbcon.PS(
  'createNoti',
  'INSERT INTO app_notification(username ,iid , timeCreated, type, isRead) VALUES($1,$2, now(), $3, FALSE)'
)

const checkNotiPS = new dbcon.PS(
  'checkNoti',
  'UPDATE app_notification SET isRead = true WHERE nid =$1'
)

const getAllNotiPS = new dbcon.PS(
  'getNoti',
  'SELECT n.nid, n.username, n.iid, n.type, n.timeCreated, n.isRead, i.name, i.owner_username FROM app_notification n INNER JOIN app_item i ON n.iid = i.iid'
)

const getNotiByUserPS = new dbcon.PS(
  'getNotiByUser',
  'SELECT n.nid, n.username, n.iid, n.type, n.timeCreated, n.isRead, i.name, i.owner_username FROM app_notification n INNER JOIN app_item i ON n.iid = i.iid  WHERE username = $1 ORDER BY timeCreated DESC'
)

function createNotification(username, iid, type) {
  return dbcon.db.none(createNotiPS, [username, iid, type])
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
  console.log(notiValues.nid)
  if (notiValues != null) {
    checkNotiPS.values = [notiValues.nid]
    console.log(checkNotiPS)
    dbcon.db
      .none(checkNotiPS)
      .then(result => {
        console.log('success')
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
