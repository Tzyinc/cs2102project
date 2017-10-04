var dbcon = require('../dbcon/database.js')

const createItemPS = new dbcon.PS(
  'createItem',
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location, description, startdate, enddate) ' +
    'VALUES($1, $2, $3, $4, now(), $5, $6, $7, $8, $9)'
)

const updateItemPS = new dbcon.PS(
  'updateItem',
  'UPDATE app_item SET owner_username = $1, name = $2, imagesrc = $3, minbid = $4, timeListed = $5, status = $6, location = $7, description = $8, startdate = $9, enddate = $10 ' +
    'WHERE iid = $11'
)

const getAllItemPS = new dbcon.PS('getItem', 'SELECT * FROM app_item ')

const getItemByUserPS = new dbcon.PS(
  'getItemByUser',
  'SELECT * FROM app_item WHERE owner_username = $1'
)

const getItemUserByIDPS = new dbcon.PS(
  'getItemUserByID',
  'SELECT i.iid, i.owner_username, i.name, i.imagesrc AS itemImg, i.description, i.minbid, i.timeListed, i.status, i.location, i.startdate, i.enddate, u.userrating, u.imagesrc AS userImg FROM app_item i INNER JOIN app_user u ON i.owner_username = u.username WHERE i.iid = $1'
)

function createItem(req, res){
  var itemDetails = req.body.data
  if (itemDetails != null) {
    createItemPS.values = [
      itemDetails.owner_username,
      itemDetails.name,
      itemDetails.imageSrc,
      itemDetails.minBid,
      itemDetails.status,
      itemDetails.location,
      itemDetails.description,
      itemDetails.startdate,
      itemDetails.enddate
    ]
  }
  dbcon.db
    .any(createItemPS)
    .then(result => {
      res.json({success: true})
    })
    .catch(error => {
      res.json(error)
    })
}

function updateItem(req, res){
  var itemDetails = req.body.data
  console.log('test')
  if (itemDetails != null) {
    updateItemPS.values = [
      itemDetails.owner_username,
      itemDetails.name,
      itemDetails.imageSrc,
      itemDetails.minBid,
      itemDetails.timeListed,
      itemDetails.status,
      itemDetails.location,
      itemDetails.description,
      itemDetails.startdate,
      itemDetails.enddate,
      itemDetails.iid
    ]
  }
  dbcon.db
    .any(updateItemPS)
    .then(result => {
      res.json({success: true})
    })
    .catch(error => {
      res.json(error)
    })
}

function getItem(req, res){
  var itemDetails = req.query
  if (itemDetails.item_owner != null) {
    getItemByUserPS.values = [ itemDetails.item_owner ]
    dbcon.db
      .any(getItemByUserPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    dbcon.db
      .any(getAllItemPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  }
}

function getItemWithUser(req, res){
  var itemDetails = req.query
  if (itemDetails.iid != null) {
    console.log(itemDetails.iid)
    getItemUserByIDPS.values = [ itemDetails.iid ]
    console.log(getItemUserByIDPS)
    dbcon.db
      .any(getItemUserByIDPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  } else {
    res.json({success: false})
  }
}

module.exports = {
  createItem: createItem,
  getItem: getItem,
  getItemWithUser: getItemWithUser,
  updateItem: updateItem
}
