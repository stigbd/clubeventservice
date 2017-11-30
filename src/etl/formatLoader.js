var path = require('path')
let Format = require('../models/format')

module.exports = {

  loadFormats: function () {
    // Loading formats:
    const loadJsonFile = require('load-json-file')
    var file = path.join(__dirname, '../data/formats.json')

    loadJsonFile(file)
      .then(formats => {
        for (var format of formats) {
          console.log(format)
          var data = new Format(format)

          // ---- save logic start
          data
            .save()
            .then(saved => console.log('saved', saved))
            .catch(err => {
              if (err.code === 11000) {
                return console.log('Object already saved')
              }
              console.error('err while saving', err)
            })
          // ---- save logic end
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
