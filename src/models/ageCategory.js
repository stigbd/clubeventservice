'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('AgeCategory', new Schema({
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
  // TODO add a virtual field that provides the birthyear of the class depending on the date of the competition.
}))
