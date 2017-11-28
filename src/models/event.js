'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Event', new Schema({
  name: {
    type: String
  },
  date: {
    type: Date
  },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  contenders: [{ type: Schema.Types.ObjectId, ref: 'Contender' }],
  multiRace: Boolean
}))
