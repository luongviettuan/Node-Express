var db = require('../db')
module.exports.addToCart = (req, res, next)=>{
    var productId = req.params.productId
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        res.redirect('/products')
        return;
    }
}