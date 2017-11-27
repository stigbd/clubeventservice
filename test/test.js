'use strict'

let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Event = require('../src/models/event')
var chai = require('chai')
var chaiHttp = require('chai-http')
var jwt = require('jsonwebtoken')

let should = chai.should()
require('dotenv').config()
chai.use(chaiHttp)
var dirtyChai = require('dirty-chai')
chai.use(dirtyChai)

let url = 'http://' + process.env.HOST + ':' + process.env.PORT

let dbConnectionString = 'mongodb://' +
process.env.DBHOST +
':' +
process.env.DBPORT +
'/' +
process.env.TEST_DATABASE

before(function (done) {
  mongoose.connect(dbConnectionString, {useMongoClient: true}, function (err) {
    if (err) {
      console.error('Error connecting to mongodb: ', err.message)
    } else {
      console.log('Connected to the following db: ', dbConnectionString)
    }
    console.log('Testing against server at ' + url)
    done()
  })
})

after(function (done) {
  mongoose.connection.close(function (err) {
    if (err) {
      console.error(err)
    }
    done()
  })
})

describe('/', () => {
  describe('GET /', () => {
    it('should return status code 200 when GET /', () => {
      return chai.request(url)
        .get('/')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json()
          res.body.should.have.property('message')
        })
        .catch(err => {
          console.error(err)
          throw err // Re-throw the error if the test should fail when an error happens
        })
    })
  })
})
