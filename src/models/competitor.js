'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Competitor', new Schema({
  name: {
    type: String,
    unique: true
  },
  bib: {
    type: Number,
    unique: true
  },
  birthdate: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['FEMALE', 'MALE', 'MIXED']
  }
}))
