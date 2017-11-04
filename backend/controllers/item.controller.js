var dbcon = require('../dbcon/database.js')
var tagController = require('../controllers/tag.controller.js')
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

const updateItemNoImgPS = new dbcon.PS(
  'updateItemNoImg',
  'UPDATE app_item SET owner_username = $1, name = $2, minbid = $3, timeListed = $4, status = $5, location = $6, description = $7, startdate = $8, enddate = $9 ' +
    'WHERE iid = $10'
)

const getItemsPS = new dbcon.PS('getItems', 'SELECT * FROM app_item ')

const getItemsCountPS = new dbcon.PS(
  'getItemsCount',
  'SELECT count(*) FROM app_item '
)

const getItemsOffsetLimitPS = new dbcon.PS(
  'getItemsOffsetLimit',
  'SELECT * FROM app_item LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitTimeListedASCPS = new dbcon.PS(
  'getItemsOffsetLimitTimeListedASCPS',
  'SELECT * FROM app_item ORDER BY timeListed ASC LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitTimeListedDESCPS = new dbcon.PS(
  'getItemsOffsetLimitTimeListedDESCPS',
  'SELECT * FROM app_item ORDER BY timeListed DESC LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitMinbidASCPS = new dbcon.PS(
  'getItemsOffsetLimitMinbidASCPS',
  'SELECT * FROM app_item ORDER BY minbid ASC LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitMinbidDESCPS = new dbcon.PS(
  'getItemsOffsetLimitMinbidDESCPS',
  'SELECT * FROM app_item ORDER BY minbid DESC LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitNameASCPS = new dbcon.PS(
  'getItemsOffsetLimitNameASCPS',
  'SELECT * FROM app_item ORDER BY name ASC LIMIT $1 OFFSET $2'
)

const getItemsOffsetLimitNameDESCPS = new dbcon.PS(
  'getItemsOffsetLimitNameDESCPS',
  'SELECT * FROM app_item ORDER BY name DESC LIMIT $1 OFFSET $2'
)

const getItemByUserPS = new dbcon.PS(
  'getItemByUser',
  'SELECT * FROM app_item WHERE owner_username = $1'
)

const getItemByNamePS = new dbcon.PS(
  'getItemByName',
  'SELECT * FROM app_item WHERE name ILIKE $1'
)

const getItemPS = new dbcon.PS(
  'getItem',
  'SELECT i.iid, i.owner_username, i.name, i.imagesrc AS itemImg, i.description, i.minbid,' +
    ' i.timeListed, i.status, i.location, i.startdate, i.enddate, u.userrating, u.imagesrc ' +
    'AS userImg FROM app_item i INNER JOIN app_user u ON i.owner_username = u.username ' +
    'WHERE i.iid = $1'
)

const deleteItemByIDPS = new dbcon.PS(
  'deleteItemByID',
  'DELETE FROM app_item WHERE iid = $1'
)

const changeItemStatusPS = new dbcon.PS(
  'changeItemStatus',
  'UPDATE app_item SET status = $1 WHERE iid = $2'
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
      imageSaver.saveToFile(itemDetails.imageBin, result.iid)
      res.json({ success: true })
    })
    .catch(error => {
      console.error(error)
      res.json(error)
    })
}

function updateItem(req, res) {
  var itemDetails = req.body.data
  if (itemDetails != null && itemDetails.imageBin != '') {
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
    dbcon.db
      .none(updateItemPS)
      .then(result => {
        imageSaver.saveToFile(itemDetails.imageBin, itemDetails.iid)
        res.json({ success: true })
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  } else if (itemDetails != null && itemDetails.imageBin === '') {
    // updateItemNoImgPS
    var startDate = new Date(itemDetails.startdate)
    var endDate = new Date(itemDetails.enddate)
    updateItemNoImgPS.values = [
      itemDetails.owner_username,
      itemDetails.name,
      itemDetails.minBid,
      itemDetails.timeListed,
      itemDetails.status,
      itemDetails.location,
      itemDetails.description,
      startDate,
      endDate,
      itemDetails.iid
    ]
    dbcon.db
      .none(updateItemNoImgPS)
      .then(result => {
        res.json({ success: true })
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  } else {
    res.json({ error: 'no data' })
  }
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
        console.error(error)
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
        console.error(error)
        res.json(error)
      })
  } else if (itemDetails.limit != null || itemDetails.offset != null) {
    var limit = itemDetails.limit || null
    var offset = itemDetails.offset || 0
    if (itemDetails.sort != null) {
      if (itemDetails.sort === 'earliest') {
        dbcon.db
          .any(getItemsOffsetLimitTimeListedASCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      } else if (itemDetails.sort === 'latest') {
        dbcon.db
          .any(getItemsOffsetLimitTimeListedDESCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      } else if (itemDetails.sort === 'expensive') {
        // getItemsOffsetLimitMinbidASCPS
        dbcon.db
          .any(getItemsOffsetLimitMinbidDESCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      } else if (itemDetails.sort === 'cheap') {
        dbcon.db
          .any(getItemsOffsetLimitMinbidASCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      } else if (itemDetails.sort === 'ztoa') {
        // getItemsOffsetLimitNameDESCPS
        dbcon.db
          .any(getItemsOffsetLimitNameDESCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      } else {
        dbcon.db
          .any(getItemsOffsetLimitNameASCPS, [limit, offset])
          .then(result => {
            res.json(result)
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      }
    } else {
      dbcon.db
        .any(getItemsOffsetLimitPS, [limit, offset])
        .then(result => {
          res.json(result)
        })
        .catch(error => {
          console.error(error)
          res.json(error)
        })
    }
  } else {
    dbcon.db
      .any(getItemsPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  }
}

function getItem(req, res) {
  var itemDetails = req.query
  if (itemDetails.iid != null) {
    getItemByIid(itemDetails.iid)
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

function getItemByIid(iid) {
  getItemPS.values = [iid]
  return dbcon.db.one(getItemPS)
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

function changeItemStatus(itemStatus, iid) {
  changeItemStatusPS.values = [itemStatus, iid]
  return dbcon.db.none(changeItemStatusPS)
}

function updateItemTags(req, res) {
  var itemDetails = req.body.data
  console.log('entered updateItemTags ', req.body)
  if (itemDetails != null) {
    tagController
      .deleteItemTags(itemDetails.iid)
      .then(result => {
        var promiseArr = tagController.createItemTags(
          itemDetails.tags,
          itemDetails.iid
        )
        Promise.all(promiseArr)
          .then(result => {
            console.log('updateItemTags success')
            res.json({ success: true })
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      })
      .catch(error => {
        console.log(error)
        res.json(error)
      })
  }
}

function getItemsCount(req, res) {
  dbcon.db
    .one(getItemsCountPS)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      console.log(error)
      res.json(error)
    })
}

module.exports = {
  createItem: createItem,
  getItems: getItems,
  getItem: getItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
  changeItemStatus: changeItemStatus,
  getItemByIid: getItemByIid,
  updateItemTags: updateItemTags,
  getItemsCount: getItemsCount
}
