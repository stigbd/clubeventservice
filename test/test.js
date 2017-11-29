'use strict'

let mongoose = require('mongoose')
let Competition = require('../src/models/competition')
var chai = require('chai')
var chaiHttp = require('chai-http')

let should = chai.should()
require('dotenv').config()
chai.use(chaiHttp)
var dirtyChai = require('dirty-chai')
chai.use(dirtyChai)

let url = process.env.SCHEME + '://' + process.env.HOST + ':' + process.env.PORT

let promiseLib = global.Promise
let uri = 'mongodb://' +
process.env.DBHOST +
':' +
process.env.DBPORT +
'/' +
process.env.TEST_DATABASE

var options = {
  useMongoClient: true,
  promiseLibrary: promiseLib
}

before(function (done) {
  mongoose.connect(uri, options)
    .then(() => {
      console.log('Connected to the following db: ' + uri)
    })
    .catch(err => {
      console.error('Error while trying to connect with mongodb')
      throw err
    })
  console.log('Testing against server at ' + url)
  done()
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

describe('/competition', () => {
  describe('GET /competition', () => {
    let competitionId1, competitionId2
    before(function (done) {
      let competition1 = new Competition({
        name: 'Competition One',
        date: new Date(2017, 7, 14),
        multiRace: false
      })
      let competition2 = new Competition({
        name: 'Competition Two',
        date: new Date(2017, 7, 14),
        multiRace: false
      })

      competition1.save(function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        competitionId1 = competition1.id
      })
      competition2.save(function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        competitionId2 = competition2.id
        done()
      })
    })

    after(function (done) {
      Competition.findByIdAndRemove(competitionId1, function (err) {
        if (err) {
          console.error(err)
          throw err
        }
      })
      Competition.findByIdAndRemove(competitionId2, function (err) {
        if (err) {
          console.error(err)
          throw err
        }
        done()
      })
    })

    it('should return status code 200 and a list of competitions when GET /competition', () => {
      return chai.request(url)
        .get('/competition')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json()
          res.body.should.be.an('object')
          Object.keys(res.body).length.should.equal(2)
        })
        .catch(err => {
          console.error(err)
          throw err // Re-throw the error if the test should fail when an error happens
        })
    })
  })
  describe('POST /competition', () => {
    it('should return status code 204 and a location header when good jwt')
    it('should return status code 401 when bad jwt')
  })
  describe('/competition/competitor', () => {
    describe('GET /competition/:competitionId/competitor', () => {
      it('should return status code 200 and a list of competitors in an competition when GET /competition/:competitionId/competitor')
    })
  })
  describe('/competition/:competitionId/race', () => {
    describe('GET /competition/:competitionId/race', () => {
      it('should return status code 200 and a list of races in an competition when GET /competition/:competitionId/race')
    })
  })
})
