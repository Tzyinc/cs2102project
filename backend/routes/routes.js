var express = require('express')
var router = express.Router()

router.get('/', function (req, res){
  res.json({message: 'API entry point is /api/<object>'})
})

// for every new schema, write routes for them
// import functions from controller file

var exampleController = require('../controllers/example.controller.js')
var userController = require('../controllers/user.controller.js')
// routes for each function
/* http accepts get, post, put, head, delete, options,
trace, copy, lock, mkcol, move, purge, unlock, report,
mkactivity, checkout, merge, m-search, notify, subscribe,
unsubscribe, patch and search. */

router.route('/example').get(exampleController.example)
router.route('/user').put(userController.createUser)
router.route('/user').post(userController.authUser)

module.exports = router