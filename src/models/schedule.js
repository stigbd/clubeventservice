'use strict'
var mongoose = require('mongoose')
require('mongoose-type-url')
var Schema = mongoose.Schema
mongoose.Promise = global.Promise

module.exports = mongoose.model('Schedule', new Schema({
  line: [
    {race: mongoose.SchemaTypes.Url, time: Date}
  ]
}))
