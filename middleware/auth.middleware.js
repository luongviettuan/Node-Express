var db = require('../db')
module.exports.requireAuth = (req, res, next) => {
    if(!req.signedCookies.emailId){
        res.redirect('/auth/login')
        return;
    }
    var user = db.get('users').find({email : req.signedCookies.emailId}).value()
    if(!user){
        res.redirect('/auth/login')
        return;
    }
    
    res.locals.user = user;
    next()
}