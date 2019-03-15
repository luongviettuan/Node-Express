var express = require('express');
var app = express()
var usersRouter = require('./routers/users.router')

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/users', usersRouter)


app.set('view engine', 'pug')
app.set('views', './views')

var port = 3000;

app.get('/', (req, res) =>{
    res.send('Hello Boy')
})
app.get('/hellopug', (req,res)=>{
    res.render('index', {title : 'hello pug',
                        name : 'Luong Viet Tuan',
                        townHome : 'Thanh Hoa'
                    })
})



app.listen(port, ()=>{
    console.log('done in ' + port);
})