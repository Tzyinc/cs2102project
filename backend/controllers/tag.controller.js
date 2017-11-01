var dbcon = require('../dbcon/database.js')

const selectTopNTagCountsPS = new dbcon.PS(
  'selectTopNTags',
  'SELECT * FROM app_tag_count ORDER BY count DESC LIMIT $1'
)

const selectAllTagCountPS = new dbcon.PS(
  'selectAllTags',
  'SELECT * FROM app_tag_count ORDER BY count DESC'
)

const addTagCountPS = new dbcon.PS(
  'addTagCount',
  'INSERT INTO app_tag_count (tag, count) VALUES ($1, 0) ON CONFLICT (tag) DO UPDATE SET count = app_tag_count.count + 1'
)

const getAllExistingTagsPS = new dbcon.PS(
  'getAllExistingTags',
  'SELECT DISTINCT tag FROM app_tag_relation'
)

const getTagByItemsPS = new dbcon.PS(
  'getTagByItems',
  'SELECT DISTINCT tag FROM app_tag_relation WHERE iid = $1'
)

const createItemTagsPS = new dbcon.PS(
  'createItemTags',
  'INSERT INTO app_tag_relation (tag, iid) VALUES ($1, $2)'
)

const deleteItemTagsPS = new dbcon.PS(
  'deleteItemTags',
  'DELETE FROM app_tag_relation WHERE iid = $1'
)

// GET request to /api/tags?topN=__ OR /api/tags
function getTopTagCounts(req, res){
  var tagValue = req.query
  if (tagValue != null) {
    selectTopNTagsPS.values = [ tagValue.topN ]
    dbcon.db
      .any(selectTopNTagsPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        console.log(error)
        res.json(error)
      })
  } else {
    dbcon.db
      .any(selectAllTagsPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        console.log(error)
        res.json(error)
      })
  }
}

function addTagCount(tag){
  if (tag != null) {
    addTagCountPS.values = [ tag ]
    return dbcon.db.none(addTagCountPS)
  }
}

// returns array of promises
function addMultipleTagCount(tags){
  var promiseArr = []
  for (let index in tags) {
    var tag = tags[index]
    promiseArr.push(addTagCount(tag))
  }
  return promiseArr
}

function deleteItemTags(iid){
  deleteItemTagsPS.values = [ iid ]
  console.log('deleteing' + iid)
  return dbcon.db.none(deleteItemTagsPS)
}

function createItemTags(tags, iid){
  var promiseArr = []
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i]
    console.log('creating', tag, i, 'with', iid)
    // createItemTagsPS.values = [tags[i], iid]
    promiseArr.push(dbcon.db.none(createItemTagsPS, [ tag, iid ]))
  }
  return promiseArr
}

function getAllTags(req, res){
  var tagDetails = req.query
  if (tagDetails.iid != null) {
    getTagByItemsPS.values = [ tagDetails.iid ]
    dbcon.db
      .any(getTagByItemsPS)
      .then(result => {
        res.json(result.map(x => x.tag))
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  } else {
    dbcon.db
      .any(getAllExistingTagsPS)
      .then(result => {
        res.json(result.map(x => x.tag))
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  }
}

module.exports = {
  getTopTagCounts: getTopTagCounts,
  addTagCount: addTagCount,
  addMultipleTagCount: addMultipleTagCount,
  deleteItemTags: deleteItemTags,
  createItemTags: createItemTags,
  getAllTags: getAllTags
}
