'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

// In accordance with ICR 341.1 , age category does not split on gender
module.exports = mongoose.model('AgeCategory', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  }
  // TODO add a virtual field that provides the birthyear of the class depending on the date of the competition.
}))
