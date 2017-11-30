var express = require('express')
var formatController = require('../controllers/formatController')

var router = express.Router()

router.route('/format').get(formatController.getFormats)

module.exports = router
