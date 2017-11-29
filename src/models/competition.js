'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Competition', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date
  },
  format: {
    type: Schema.Types.ObjectId,
    ref: 'Format'
  },
  schedule: { type: Schema.Types.ObjectId, ref: 'Schedule' },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
  competitors: [{ type: Schema.Types.ObjectId, ref: 'Competitor' }],
  multiRace: Boolean
}))
