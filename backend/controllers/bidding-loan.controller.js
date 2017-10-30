var dbcon = require('../dbcon/database.js')
var itemController = require('../controllers/item.controller.js')

const createBidPS = new dbcon.PS(
  'createBid',
  'INSERT INTO app_bidding (bidder_username, iid, price, time) VALUES ($1, $2, $3, now())' +
    'ON CONFLICT (bidder_username, iid) DO UPDATE SET price = $3, time = now()'
)

const selectBidsPS = new dbcon.PS(
  'selectBids',
  'SELECT * FROM app_bidding WHERE iid = $1 ORDER BY price DESC'
)

const createLoanPS = new dbcon.PS(
  'createLoan',
  'INSERT into app_loan (borrower_username, iid, price) VALUES($1, $2, $3)'
)

const getLoanPS = new dbcon.PS(
  'getLoan',
  'SELECT l.borrower_username, l.iid, l.price, i.owner_username, i.name, i.location' +
    ' FROM app_loan l INNER JOIN app_item i ON l.iid = i.iid WHERE iid = $1'
)

function createBid(req, res) {
  var bidDetails = req.body.data
  if (bidDetails != null) {
    createBidPS.values = [
      bidDetails.bidder_username,
      bidDetails.iid,
      bidDetails.price
    ]
    dbcon.db
      .none(createBidPS)
      .then(result => {
        res.json({ success: true })
      })
      .catch(error => {
        console.error('ERROR:', error)
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
        console.error(error)
        res.json(error)
      })
  } else {
    res.json({ error: 'no iid found' })
  }
}

function confirmLoan(req, res) {
  var bidDetails = req.body.data
  if (bidDetails != null) {
    // create loan
    bidDetails.iid
    bidDetails.bidder_username
    bidDetails.price
    createLoanPS.values = [
      bidDetails.bidder_username,
      bidDetails.iid,
      bidDetails.price
    ]
    dbcon.db
      .none(createLoanPS)
      .then(result => {
        // delete bids?
        // make item status unavailable
        itemController
          .changeItemStatus(false, bidDetails.iid)
          .then(result => {
            // send notifications
            res.json({ success: true })
          })
          .catch(error => {
            console.error(error)
            res.json(error)
          })
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
    // bidDetails.time
  } else {
    res.json({ error: 'no bid details found' })
  }
}

function getLoaningUser(req, res) {
  var loanDetails = req.query
  if (loanDetails.iid != null) {
    getLoanPS.values = loanDetails.iid
    dbcon.db
      .one(getLoanPS)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        console.error(error)
        res.json(error)
      })
  }
}

module.exports = {
  createBid: createBid,
  getBidsByIid: getBidsByIid,
  confirmLoan: confirmLoan,
  getLoaningUser: getLoaningUser
}
