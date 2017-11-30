'use strict'

let express = require('express')
let cors = require('cors')
let app = express()
let morgan = require('morgan')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors())

var promiseLib = global.Promise

// Set up mongodb connection
let uri
var db = process.env.DATABASE
if (process.env.NODE_ENV === 'test') {
  db = process.env.TEST_DATABASE
}
uri = 'mongodb://' + process.env.DBHOST + ':' + process.env.DBPORT + '/' + db

var options = {
  useMongoClient: true,
  promiseLibrary: promiseLib
}

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to the following db: ' + uri)
    // ===== Load default data ====
    var formatLoader = require('./etl/formatLoader')
    formatLoader.loadFormats()
  })
  .catch(err => {
    console.error('Error while trying to connect with mongodb')
    throw err
  })

// routes
var format = require('./routes/format')
var competition = require('./routes/competition')
var ageCategory = require('./routes/ageCategory')
app.use('/', format)
app.use('/', competition)
app.use('/', ageCategory)

// ===== Public Routes =====

// Get root
app.get('/', (req, res) => {
  res.status(200).json({'message': 'hello world, from competition-administration-service'})
})

// ====== Error handling =========
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({'message': 'Invalid token'})
  }
  next(err)
})

app.listen(process.env.PORT)
console.log('Listening on ', process.env.SCHEME + '://' + process.env.HOST + ':' + process.env.PORT)
