var express = require('express')
var router = express.Router()

var productsController = require('../controller/products.controller') 

router.get('/', productsController.getPagination)

module.exports = router;