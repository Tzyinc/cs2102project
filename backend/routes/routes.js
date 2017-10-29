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
var bcrypt = require('bcryptjs')

var cred = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../credentials.json'), 'utf8')
)

// import functions from controller file
var exampleController = require('../controllers/example.controller.js')
var userController = require('../controllers/user.controller.js')
var itemController = require('../controllers/item.controller.js')
var blController = require('../controllers/bidding-loan.controller.js')

// jwt implementation
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: cred.jwt.secret
}

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
  console.log('payload received', jwt_payload)
  var usernamePromise = userController.getAllUsernames()
  usernamePromise
    .then(result => {
      var user = result[_.findIndex(result, {username: jwt_payload.username})]
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

function jwtlogin(req, res){
  if (req.body.data) {
    var username = req.body.data.username
    var password = req.body.data.password
  }
  var usernamePwPromise = userController.getUsernamePw(username)
  usernamePwPromise
    .then(result => {
      console.log('Old password: ' + password)
      console.log('Saved password: ' + result.password)
      if (bcrypt.compareSync(password, result.password)) {
        var payload = {username: result.username}
        var token = jwt.sign(payload, jwtOptions.secretOrKey)
        console.log(payload, token)
        res.json({success: true, token: token})
      } else {
        res.status(401).json({message: 'passwords did not match'})
      }
    })
    .catch(error => {
      console.error(error)
      res.status(401).json({message: 'no such user found', error: error})
    })
}

router.get('/', function(req, res){
  res.json({message: 'API entry point is /api/<object>'})
})

// for every new schema, write routes for them

/* http accepts get, post, put, head, delete, options,
trace, copy, lock, mkcol, move, purge, unlock, report,
mkactivity, checkout, merge, m-search, notify, subscribe,
unsubscribe, patch and search. */

router
  .route('/example')
  .get(
    passport.authenticate('jwt', {session: false}),
    exampleController.example
  )
router.route('/login').post(jwtlogin)
router.use('/img', express.static(path.join(__dirname, '../img/src')))
router.use('/uimg', express.static(path.join(__dirname, '../img/usrc')))
router.route('/example').get(exampleController.example)
router.route('/user').put(userController.createUser)
router
  .route('/password')
  .post(
    passport.authenticate('jwt', {session: false}),
    userController.updatePassword
  )
router.route('/user').get(userController.getUserDetails)
router
  .route('/user')
  .post(
    passport.authenticate('jwt', {session: false}),
    userController.updateUserImg
  )
router
  .route('/item')
  .put(
    passport.authenticate('jwt', {session: false}),
    itemController.createItem
  )
router
  .route('/item')
  .post(
    passport.authenticate('jwt', {session: false}),
    itemController.updateItem
  )
router
  .route('/item')
  .delete(
    passport.authenticate('jwt', {session: false}),
    itemController.deleteItem
  )
router.route('/item').get(itemController.getItem)
router.route('/items').get(itemController.getItems)
router
  .route('/tokenValid')
  .get(passport.authenticate('jwt', {session: false}), function(req, res){
    res.json({success: true})
  })
router
  .route('/bid')
  .put(passport.authenticate('jwt', {session: false}), blController.createBid)
router.route('/bids').get(blController.getBidsByIid)
module.exports = router
