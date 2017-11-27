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

let url = process.env.SCHEME + '://' + process.env.HOST + ':' + process.env.PORT

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

describe('/event', () => {
  describe('GET /event', () => {

    let eventId1, eventId2;
    before(function (done) {
      let event1 = new Event({
        name: 'Event One',
        date: new Date(2017, 7, 14),
        multiRace: false
      })
      let event2 = new Event({
        name: 'Event Two',
        date: new Date(2017, 7, 14),
        multiRace: false
      })

      event1.save(function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        eventId1 = event1.id
      })
      event2.save(function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        eventId2 = event2.id
        done()
      })
    })

    after(function (done) {
      Event.findByIdAndRemove(eventId1, function (err) {
        if (err) {
          console.error(err)
          throw err
        }
      })
      Event.findByIdAndRemove(eventId2, function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        done()
      })
    })

    it('should return status code 200 and a list of events when GET /event', () => {
      return chai.request(url)
      .get('/event')
      .then(res => {
        res.should.have.status(200)
        res.should.be.json()
        res.body.should.be.an('object')

        // should test for a list of races
      })
      .catch(err => {
        console.error(err)
        throw err // Re-throw the error if the test should fail when an error happens
      })
    })
  })
  describe('POST /event', () => {
    it('should return status code 204 and a location header when good jwt')
    it('should return status code 401 when bad jwt')
  })
  describe('/event/contender', () => {
    describe('GET /event/:eventId/contender', () => {
      it('should return status code 200 and a list of contenders in an event when GET /event/:eventId/contender')
    })
  })
  describe('/event/:eventId/race', () => {
    describe('GET /event/:eventId/race', () => {
      it('should return status code 200 and a list of races in an event when GET /event/:eventId/race')
    })
  })
})
