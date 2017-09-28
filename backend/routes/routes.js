var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.json({ message: 'API entry point is /api/<object>' })
})

// for every new schema, write routes for them
// import functions from controller file
var exampleController = require('../controllers/example.controller.js')
var loginController = require('../controllers/login-controller.js')
// routes for each function
router.route('/example').get(exampleController.example)
router.route('/login').post(login-controller.login)
module.exports = router
