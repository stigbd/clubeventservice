'use strict'

var mongoose = require('mongoose')
require('./class')
var Class = mongoose.model('Class').schema
var Schema = mongoose.Schema

module.exports = mongoose.model('Event', new Schema({
  name: {
    type: String,
    unique: true
  },
  date: {
    type: Date
  },
  classes: [Class],
  multiRace: Boolean
}))
