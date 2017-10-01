var dbcon = require('../dbcon/database.js')

const createItemPS = new dbcon.PS(
  'createItem',
  'INSERT INTO app_item (owner_username, name, imagesrc, minbid, timeListed, status, location) ' +
    'VALUES($1,$2,$3,$4,now(),$5,$6)'
)

const getAllItemPS = new dbcon.PS('getItem', 'SELECT * FROM app_item ')

const getItemByUserPS = new dbcon.PS(
  'getItemByUser',
  'SELECT * FROM app_item WHERE owner_username = $1'
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
      itemDetails.location
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

module.exports = {
  createItem: createItem,
  getItem: getItem
}
