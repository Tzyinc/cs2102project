var dbcon = require('../dbcon/database.js')
const createBidPS = new dbcon.PS(
  'createBid',
  'INSERT INTO app_bidding (bidder_username, iid, price, time) VALUES ($1, $2, $3, now())'
)

const selectBidsPS = new dbcon.PS('selectBids', 'SELECT * FROM WHERE iid = $1')

function createBid(req, res) {
  var bidDetails = req.body.data
  if (bidDetails != null) {
    createBidPs.values = [bidDetails.username, bidDetails.iid, bidDetails.price]
    dbcon.db
      .none(createBidPS)
      .then(result => {
        res.json({ success: true })
      })
      .catch(error => {
        console.log('ERROR:', error)
        res.json(error)
      })
  }
}

function getBidsByIid(req, res) {
  var bidDetails = req.query
  if (bidDetails != null) {
    selectBidsPS.values = [bidDetails.iid]
    dbcon.db
      .any(selectBidsPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        console.log(error)
        res.json(error)
      })
  }
}

module.exports = {
  createBid: createBid,
  getBidsByIid: getBidsByIid
}
