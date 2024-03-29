var shortid = require('shortid')
var db = require('../db')
module.exports = (req, res, next) =>{
    if( !req.signedCookies.sessionId){
        var sessionId = shortid.generate()
        res.cookie('sessionId', sessionId, {signed : true})
        db.get('session').push({
            sessionId : sessionId
        }).write()
    }
    next()
}