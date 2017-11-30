var Format = require('../models/format')

module.exports = {
  getFormats: function (req, res) {
    Format.find({}, function (err, formats) {
      if (err) {
        return res.sendStatus(500)
      }
      var formatMap = {}
      formats.forEach(function (format) {
        var payload = {
          id: format.id,
          name: format.name,
          date: format.date,
          multiRace: format.multiRace
        }
        formatMap[format._id] = payload
      })
      res.send(formatMap)
    })
  }
}
