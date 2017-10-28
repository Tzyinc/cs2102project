// packages
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(bodyParser.json({ limit: '5mb' }))

// port can be overwritten here
var port = process.env.PORT || 8080

// API routes
var projectRoutes = require('./backend/routes/routes.js')

app.use('/api', projectRoutes)

app.listen(port)
console.log('Server started, listening on port: ' + port)
