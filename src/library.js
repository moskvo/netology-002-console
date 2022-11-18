const express = require('express')
const logger = require('./middleware/logger')
const err404 = require('./middleware/err-404')
const path = require('path')

const library = new Map()
const booksrouter = require('./routes/api_books')(library,process.env.COUNTER_URL||'localhost')
 
const app = express()
app.use(express.urlencoded({extended:true}))
app.set('view engine', "ejs")
app.set('views', path.join(__dirname, './views'))
app.use(logger)

app.post('/api/user/login', (req,res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
    })

app.use('/books', booksrouter )

app.use('/', (req,res) => {
    res.render('index', {title: 'Main'})
    })

app.use(err404)

app.listen( process.env.PORT || 3000, ()=>console.log('Listen'))