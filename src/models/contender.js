'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

module.exports = mongoose.model('Contender', new Schema({
  name: {
    type: String,
    unique: true
  },
  bib: {
    type: Number,
    unique: true
  },
  birthdate: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['FEMALE', 'MALE', 'MIXED']
  }
}))
