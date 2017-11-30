var path = require('path')
let AgeCategory = require('../models/ageCategory')

module.exports = {

  loadAgeCategory: function () {
    // Loading ageCategory:
    const loadJsonFile = require('load-json-file')
    var file = path.join(__dirname, '../data/ageCategories.json')

    loadJsonFile(file)
      .then(ageCategories => {
        for (var ageCategory of ageCategories) {
          console.log(ageCategory)
          var data = new AgeCategory(ageCategory)

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
