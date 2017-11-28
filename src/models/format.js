'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Format', new Schema({
  name: {
    type: String
  },
  startProcedure: {
    type: String,
    enum: ['Interval', 'Mass', 'Pursuit', 'Heat']
  }
}))
