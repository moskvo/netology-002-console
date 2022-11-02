const Book = require('../src/book')
const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileupload = require('../middleware/file')

const err404answer = {errcode: 404, errmsg: "Page not found"}

let library = new Map()

router.get('/', (req, res) => {
    res.json([...library.values()])
    })
    
router.get('/:id', (req, res) => {
    const id = req.params.id
    const book = library.get(id)

    if( book ) {
        res.status(201)
        res.json(book)
        }
    else {
        res.status(404)
        res.json(err404answer)
        }
        })

router.get('/:id/download', async (req,res) => {
    const id = req.params.id
    const book = library.get(id)

    if( book ) {
        if( !book.fileBook ) {   
            res.status(404)
            res.json({errcode:404, errmsg:"The book hasn't file"})
        }     
        const filePath = `./books/${book.fileBook}`;
        res.status(201)
        res.download(filePath,book.fileName);
        }
    else {
        res.status(404)
        res.json(err404answer)
        }
    })
       
router.post('/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
    library.set(''+newBook.id, newBook)
    res.status(201)
    res.json(newBook)
    })

router.post('/:id/upload', fileupload.single('filebook'), (req,res)=>{
    const id = req.params.id
    const book = library.get(id)

    if( book ){
        book.fileBook = req.file.filename
        book.fileName = req.file.originalname
        res.status(201)
        res.json(book)
        }
    else{
        res.status(404);
        res.json(err404answer)
        }

    })

router.put('/:id', (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const id = req.params.id
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
        res.json(err404answer)
        }
    })

router.delete('/:id', (req, res) => {
    const {id} = req.params
    const book = library.get(id)
        
    if ( book ) {
        library.delete(id)
        res.json(true)
        }
    else {
        res.status(404)
        res.json(err404answer)
        }
    })

module.exports = function(library) { library = library; return router; }