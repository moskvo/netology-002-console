const express = require('express')
const { v4: uuid } = require('uuid')


const library = new Map()

/*
book = {
    id: "string",
    title: "string",
    description: "string",
    authors: "string",
    favorite: "string",
    fileCover: "string",
    fileName: "string"
  }
  */
class Book {
    constructor(title = "", description = "", authors="", favorite="", fileCover="", fileName="") {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = uuid()
        }
    }

const app = express()
app.use(express.json())

app.post('/api/user/login', (req,res) => {
    res.status(201)
    res.json({ id: 1, mail: "test@mail.ru" })
    })

app.get('/api/books', (req, res) => {
    res.json(library)
    })

app.get('/api/books/:id', (req, res) => {
    const {id} = req.params
    const book = library.get(id)

    if( book ) {
        res.json(book)
        }
    else {
        res.status(404)
        res.json('404 | страница не найдена')
        }
    })

app.post('/api/books', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    library.set(newBook.id, newBook)
    res.status(201)
    res.json(newBook)
    })

app.put('/api/books/:id', (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const book = library.get(id)

    if (book){
        library.set(id,{
            ...book,
            title, description, authors, 
            favorite, fileCover, fileName
            })

        res.json(book)
        } 
    else {
        res.status(404)
        res.json('404 | страница не найдена')
        }
    })

app.delete('/api/books/:id', (req, res) => {
    const {id} = req.params
    const book = library.get(id)
     
    if ( book ) {
        library.delete(id)
        res.json(true)
        }
    else {
        res.status(404)
        res.json('404 | страница не найдена')
        }
    })

const PORT = process.env.PORT || 3000
app.listen(PORT)