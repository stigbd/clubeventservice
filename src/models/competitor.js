'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Competitor', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  bib: {
    type: Number,
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['FEMALE', 'MALE', 'MIXED']
  }
}))
