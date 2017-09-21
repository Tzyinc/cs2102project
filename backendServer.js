// packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())

// TODO: connect to database here.

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// port can be overwritten here
var port = process.env.PORT || 8080

// API routes
var projectRoutes = require('./backend/routes/routes.js')

app.use('/api', projectRoutes)

app.listen(port)
console.log('Server started, listening on port: ' + port)
