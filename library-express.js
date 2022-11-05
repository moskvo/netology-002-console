const express = require('express')
const logger = require('./middleware/logger')
const err404 = require('./middleware/err-404')

const library = new Map()
const router = require('./routes/api_books')(library)
 
const app = express()
app.use(express.urlencoded())
app.set('view engine', "ejs")
app.use(logger)

app.post('/api/user/login', (req,res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
    })

app.use('/api/books', router)

app.use(err404)

const PORT = process.env.PORT || 3000
app.listen(PORT)