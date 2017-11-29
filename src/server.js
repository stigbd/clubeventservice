'use strict'

let express = require('express')
let cors = require('cors')
let app = express()
let morgan = require('morgan')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let Competition = require('./models/competition')
let Format = require('./models/format')
require('dotenv').config()
var path = require('path')

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

// ===== Load default data ====
// Loading formats:
const loadJsonFile = require('load-json-file')
var file = path.join(__dirname, '/data/formats.json')
loadJsonFile(file)
  .then(formats => {
    for (var format of formats) {
      console.log(format)
      var data = new Format(format)
      // ---- save logic start
      data
        .save()
        .then(saved => console.log('saved', saved))
        .catch(err => {
          if (err.code === 11000) {
            return console.log('Object already saved')
          }
          console.error('err while saving', err)
        })
      // ---- save logic end
    }
  })
  .catch(err => {
    console.error(err)
  })

// ===== Public Routes =====

// Get root
app.get('/', (req, res) => {
  res.status(200).json({'message': 'hello world, from competition-administration-service'})
})

// Get a list of competitions
app.get('/competition', (req, res) => {
  Competition.find({}, function (err, competitions) {
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
