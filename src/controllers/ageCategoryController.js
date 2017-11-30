var ageCategory = require('../models/ageCategory')

module.exports = {
  getAgeCategories: function (req, res) {
    ageCategory.find({}, function (err, ageCategories) {
      if (err) {
        return res.sendStatus(500)
      }
      var ageCategoryMap = {}
      ageCategories.forEach(function (ageCategory) {
        var payload = {
          id: ageCategory.id,
          name: ageCategory.name,
          age: ageCategory.age
        }
        ageCategoryMap[ageCategory._id] = payload
      })
      res.send(ageCategoryMap)
    })
  }
}
