'use strict'

let express = require('express')
let cors = require('cors')
let app = express()
let morgan = require('morgan')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let Event = require('./models/competition')
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
  })
  .catch(err => {
    console.error('Error while trying to connect with mongodb')
    throw err
  })
// ===== Public Routes =====

// Get root
app.get('/', (req, res) => {
  res.status(200).json({'message': 'hello world, from competition-administration-service'})
})

// Get a list of competitions
app.get('/competition', (req, res) => {
  Event.find({}, function (err, competitions) {
    if (err) {
      return res.sendStatus(500)
    }
    var competitionMap = {}
    competitions.forEach(function (competition) {
      var payload = {
        id: competition.id,
        name: competition.name,
        date: competition.date,
        multiRace: competition.multiRace
      }
      competitionMap[competition._id] = payload
    })
    res.send(competitionMap)
  })
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({'message': 'Invalid token'})
  }
  next(err)
})

app.listen(process.env.PORT)
console.log('Listening on ', process.env.SCHEME + '://' + process.env.HOST + ':' + process.env.PORT)
