var dbcon = require('../dbcon/database.js')

const selectTopNTagsPS = new dbcon.PS(
  'selectTopNTags',
  'SELECT * FROM app_tag ORDER BY count DESC LIMIT $1'
)

const selectAllTagsPS = new dbcon.PS(
  'selectAllTags',
  'SELECT * FROM app_tag ORDER BY count DESC'
)

const addTagCountPS = new dbcon.PS(
  'addTagCount',
  'INSERT INTO app_tag (tag, count) VALUES ($1, 0) ON CONFLICT (tag) DO UPDATE SET count = app_tag.count + 1'
)

// GET request to /api/tags?topN=__ OR /api/tags
function getTopTags(req, res) {
  var tagValue = req.query
  if (tagValue != null) {
    selectTopNTagsPS.values = [tagValue.topN]
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

function addTagCount(tag) {
  if (tag != null) {
    addTagCountPS.values = [tag]
    return dbcon.db.none(addTagCountPS)
  }
}

module.exports = {
  getTopTags: getTopTags,
  addTagCount: addTagCount
}
