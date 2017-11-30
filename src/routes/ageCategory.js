var express = require('express')
var ageCategoryController = require('../controllers/ageCategoryController')

var router = express.Router()

router.route('/ageCategory').get(ageCategoryController.getAgeCategories)

module.exports = router
