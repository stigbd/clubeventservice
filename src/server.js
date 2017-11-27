'use strict'

let express = require('express')
let cors = require('cors')
let app = express()
let morgan = require('morgan')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let Event = require('./models/event')
let jsonwebtoken = require('jsonwebtoken')
let jwt = require('express-jwt')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('combined'))
app.use(cors())
mongoose.Promise = global.Promise

// Set up mongodb connection
let dbConnectionString
if (process.env.NODE_ENV === 'test') {
  dbConnectionString =
  'mongodb://' +
  process.env.DBHOST +
  ':' +
  process.env.DBPORT +
  '/' +
  process.env.TEST_DATABASE
}
if (process.env.NODE_ENV !== 'test') {
  dbConnectionString =
  'mongodb://' +
  process.env.DBHOST +
  ':' +
  process.env.DBPORT +
  '/' +
  process.env.DATABASE
}
mongoose.connect(dbConnectionString, {useMongoClient: true}, function (err) {
  if (err) {
    console.error('Error connecting to mongodb: ', err.message)
  } else {
    console.log('Connected to the following db: ', dbConnectionString)
  }
})

// ===== Public Routes =====

// Get root
app.get('/', (req, res) => {
  res.status(200).json({'message' : 'hello world, from event-administration-service'})
})

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({'message': 'Invalid token'})
  }
  next(err)
})

app.listen(process.env.PORT)
console.log('Listening on ', process.env.HOST + ':' + process.env.PORT)
