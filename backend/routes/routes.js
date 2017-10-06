var express = require('express')
var router = express.Router()
var _ = require('lodash')
var jwt = require('jsonwebtoken')
var passportJWT = require('passport-jwt')
var passport = require('passport')
var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy
var fs = require('fs')
var path = require('path')
var cred = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../credentials.json'), 'utf8')
)

// import functions from controller file
var exampleController = require('../controllers/example.controller.js')
var userController = require('../controllers/user.controller.js')
var itemController = require('../controllers/item.controller.js')

// jwt implementation
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secretOrKey = cred.jwt.secret

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload)
  // usually this would be a database call:
  var usernames = userController.getAllUsernames()
  usernames
    .then(result => {
      var user = result[_.findIndex(result, { username: jwt_payload.id })]
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
    .catch(error => {
      console.error(error)
    })
})

express().use(passport.initialize())
passport.use(strategy)

function jwtlogin(req, res) {
  if (req.body.data) {
    var name = req.body.data.name
    var password = req.body.data.password
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, { name: name })]
  if (!user) {
    res.status(401).json({ message: 'no such user found' })
  }

  if (user.password === req.body.data.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = { id: user.id }
    var token = jwt.sign(payload, jwtOptions.secretOrKey)
    res.json({ message: 'ok', token: token })
  } else {
    res.status(401).json({ message: 'passwords did not match' })
  }
}

router.get('/', function(req, res) {
  res.json({ message: 'API entry point is /api/<object>' })
})

// for every new schema, write routes for them

/* http accepts get, post, put, head, delete, options,
trace, copy, lock, mkcol, move, purge, unlock, report,
mkactivity, checkout, merge, m-search, notify, subscribe,
unsubscribe, patch and search. */

router.route('/example').get(exampleController.example)
router.route('/user').put(userController.createUser)
router.route('/user').post(userController.authUser)
router.route('/user').get(userController.getUserDetails)
router.route('/item').put(itemController.createItem)
router.route('/item').get(itemController.getItem)
router.route('/item').post(itemController.updateItem)
router.route('/item').delete(itemController.deleteItem)
router.route('/itemInfo').get(itemController.getItemWithUser)
router.route('/test').post(jwtlogin)
router
  .route('/test2')
  .get(passport.authenticate('jwt', { session: false }), function(req, res) {
    res.json('Success! You can not see this without a token')
  })

module.exports = router
