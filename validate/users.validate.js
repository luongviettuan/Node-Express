module.exports.postCreate = (req, res, next) =>{
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
    next();
}