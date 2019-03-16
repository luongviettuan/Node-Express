var db = require('../db')

var users = db.get('users')
                .value()
var i = users.length


module.exports.index = (req, res)=>{
    res.render('users/index',{
        users : db.get('users').value()
    })
}
module.exports.search = (req, res)=>{
    var q = req.query.q;
    var matchUsers = db.get('users')
                        .value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
    })
    res.render('users/index', {
        users : matchUsers
    })
    
}
module.exports.create = (req, res)=>{
    res.render('users/create')
}
module.exports.postCreate = (req, res)=>{
    var errors = [];
    if(!req.body.name){
        errors.push('name is requered')
    }
    if(!req.body.age){
        errors.push('age is requered')
    }
    if(errors.length){
        res.render('users/create', {errors : errors, values : req.body})
        return;
    }
    db.get('users')
        .push({id : i++, name : req.body.name, age : req.body.age})
        .write();
    res.redirect('/users')
}
module.exports.viewUser = (req, res) =>{
    var id = parseInt(req.params.id)
    var userView = db.get('users').find({id: id}).value()
    console.log(userView);

    res.render('users/view',{
        userView :  userView
    }) 
}