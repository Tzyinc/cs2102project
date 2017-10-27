var dbcon = require('../dbcon/database.js')
const createBidPS = new dbcon.PS(
  'createBidPS',
  'INSERT INTO app_bidding (bidder_username, iid, price, time) VALUES ($1, $2, $3, now())'
)

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
module.exports = {
  createBid: createBid
}
