var express = require('express');
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

var port = 3000;

app.set('view engine', 'pug')
app.set('views', './views')
db.defaults({users : []}).write()

var users = db.get('users')
                .value()
var i = users.length

app.get('/', (req, res) =>{
    res.send('Hello Boy')
})
app.get('/hellopug', (req,res)=>{
    res.render('index', {title : 'hello pug',
                        name : 'Luong Viet Tuan',
                        townHome : 'Thanh Hoa'
                    })
})
app.get('/users', (req, res)=>{
    res.render('users/index',{
        users : db.get('users').value()
    })
})


app.get('/users/search', (req, res)=>{
    var q = req.query.q;
    var matchUsers = db.get('users')
                        .value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) >= 0;
    })
    res.render('users/index', {
        users : matchUsers
    })
    
}) 
app.get('/users/create', (req, res)=>{
    res.render('users/create')
})
app.post('/users/create', (req, res)=>{
    db.get('users')
        .push({id : i++, name : req.body.name, age : req.body.age})
        .write();
    res.redirect('/users')
})

app.get('/users/:id', (req, res) =>{
    var id = parseInt(req.params.id)
    var userView = db.get('users').find({id: id}).value()
    console.log(userView);

    res.render('users/view',{
        userView :  userView
    })

    
})
app.listen(port, ()=>{
    console.log('done in ' + port);
})