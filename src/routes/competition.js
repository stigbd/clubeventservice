var express = require('express')
var competitionController = require('../controllers/competitionController')

var router = express.Router()

router.route('/competition').get(competitionController.getCompetitions)

module.exports = router
