'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Class', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['FEMALE', 'MALE', 'MIXED']
  }
}))
