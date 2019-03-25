var md5 = require('md5')
var db = require('../db')

module.exports.login =(req, res, next) =>{
    res.render('auth/login')
}
module.exports.postLogin = (req, res, next) =>{
    var email = req.body.email
    var user = db.get('users').find({email : email}).value()
    if(!user){
        res.render('auth/login', { errors : ['user does not exist'], values: req.body}, )
        return;
    }
    
    var password = req.body.password
    var hashedPassword = md5(password)
    if(user.password !== hashedPassword){
        res.render('auth/login',{ errors : ['wrong password'], values: req.body})
        return;
    }
    res.cookie('emailId', email, {signed : true})
    res.redirect('/users')
    next()
}
