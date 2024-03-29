require('dotenv').config()


var express = require('express');
var app = express()

var requireMiddle = require('./middleware/auth.middleware')
var cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.SESSION_SECRET))
// phải sử dụng cookies parser .v..v.. trước router

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


var sessionMiddleware = require('./middleware/session.middlewware')
app.use(sessionMiddleware)
var authRouter = require('./routers/auth.router')
app.use('/auth', authRouter)
var usersRouter = require('./routers/users.router')
app.use('/users', requireMiddle.requireAuth,usersRouter)
var productsRouter = require('./routers/products.router')
app.use('/products', requireMiddle.requireAuth, productsRouter)
var cartRouter = require('./routers/cart.router')
app.use('/cart', requireMiddle.requireAuth, cartRouter)

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



app.listen(3000, ()=>{
    console.log('done in ' + port);
})