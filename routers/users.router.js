var express = require('express')
var router = express.Router()

var controller = require('../controller/users.controller')
var validate = require('../validate/users.validate')
//var cookies = require('../cookies/users.cookies')

router.get('/', controller.index)
router.get('/search', controller.search)
router.get('/create', controller.create)
router.post('/create',validate.postCreate, controller.postCreate)

router.get('/:id', controller.viewUser)


module.exports = router