var db = require('../db')

module.exports.getPagination = (req, res, next) => {
    var page = parseInt(req.query.page) || 1
    var number = 8
    var begin = (page -1)*number
    var end = page*number
    var products = db.get('products').value()
    var paginationPro = products.slice(begin, end)
    res.render('products/pagination', {paginationPro : paginationPro})
}