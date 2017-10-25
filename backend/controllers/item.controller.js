var dbcon = require('../dbcon/database.js')
var imageSaver = require('../img/image.controller.js')

const createItemPS = new dbcon.PS(
  'createItem',
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, description, startdate, enddate) ' +
    'VALUES($1, $2, $3, $4, now(), $5, $6, $7, $8, $9) RETURNING iid'
)

const updateItemPS = new dbcon.PS(
  'updateItem',
  'UPDATE app_item SET owner_username = $1, name = $2, imagesrc = $3, minbid = $4, timeListed = $5, status = $6, location = $7, description = $8, startdate = $9, enddate = $10 ' +
    'WHERE iid = $11'
)

const getItemsPS = new dbcon.PS('getItems', 'SELECT * FROM app_item ')

const getItemByUserPS = new dbcon.PS(
  'getItemByUser',
  'SELECT * FROM app_item WHERE owner_username = $1'
)

const getItemByNamePS = new dbcon.PS(
  'getItemByName',
  'SELECT * FROM app_item WHERE name LIKE $1'
)

const getItemPS = new dbcon.PS(
  'getItem',
  'SELECT i.iid, i.owner_username, i.name, i.imagesrc AS itemImg, i.description, i.minbid, i.timeListed, i.status, i.location, i.startdate, i.enddate, u.userrating, u.imagesrc AS userImg FROM app_item i INNER JOIN app_user u ON i.owner_username = u.username WHERE i.iid = $1'
)

const deleteItemByIDPS = new dbcon.PS(
  'deleteItemByID',
  'DELETE FROM app_item WHERE iid = $1'
)

function createItem(req, res) {
  var itemDetails = req.body.data
  if (itemDetails != null) {
    var startDate = new Date(itemDetails.startdate)
    var endDate = new Date(itemDetails.enddate)
    createItemPS.values = [
      itemDetails.owner_username,
      itemDetails.name,
      'error.png',
      itemDetails.minBid,
      itemDetails.status,
      itemDetails.location,
      itemDetails.description,
      startDate,
      endDate
    ]
  }
  dbcon.db
    .one(createItemPS)
    .then(result => {
      console.log(result)
      imageSaver.saveToFile(itemDetails.imageBin, result.iid)
      res.json({ success: true })
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
}

function updateItem(req, res) {
  var itemDetails = req.body.data
  console.log('test')
  if (itemDetails != null) {
    var startDate = new Date(itemDetails.startdate)
    var endDate = new Date(itemDetails.enddate)
    updateItemPS.values = [
      itemDetails.owner_username,
      itemDetails.name,
      'error.png',
      itemDetails.minBid,
      itemDetails.timeListed,
      itemDetails.status,
      itemDetails.location,
      itemDetails.description,
      startDate,
      endDate,
      itemDetails.iid
    ]
  }
  dbcon.db
    .none(updateItemPS)
    .then(result => {
      imageSaver.saveToFile(itemDetails.imageBin, itemDetails.iid)
      res.json({ success: true })
    })
    .catch(error => {
      res.json(error)
    })
}

function getItems(req, res) {
  var itemDetails = req.query
  if (itemDetails.item_owner != null) {
    getItemByUserPS.values = [itemDetails.item_owner]
    dbcon.db
      .any(getItemByUserPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else if (itemDetails.name_like != null) {
    getItemByNamePS.values = [dbcon.addWildcard(itemDetails.name_like)]
    dbcon.db
      .any(getItemByNamePS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    dbcon.db
      .any(getItemsPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  }
}

function getItem(req, res) {
  var itemDetails = req.query
  if (itemDetails.iid != null) {
    getItemPS.values = [itemDetails.iid]
    dbcon.db
      .one(getItemPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    res.json({ success: false })
  }
}

function deleteItem(req, res) {
  var itemDetails = req.body.data
  if (itemDetails.iid != null) {
    deleteItemByIDPS.values = [itemDetails.iid]
    dbcon.db
      .any(deleteItemByIDPS)
      .then(result => {
        res.json({ success: true })
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    res.json({ success: false })
  }
}

module.exports = {
  createItem: createItem,
  getItems: getItems,
  getItem: getItem,
  updateItem: updateItem,
  deleteItem: deleteItem
}
