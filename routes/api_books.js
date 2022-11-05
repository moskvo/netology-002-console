const Book = require('../src/book')
const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileupload = require('../middleware/file')

const err404answer = {errcode: 404, errmsg: "Page not found"}

let library = new Map()

router.get('/', (req, res) => {
    res.render("books/index", {
        title: "Library",
        todos: [...library.values()],
        })
    })

router.get('/create', (req, res) => {
    res.render("books/create", {
            title: "Library | create",
            todo: {},
        });
    });

router.post('/create', 
    fileupload.fields([
        { name: 'filecover', maxCount: 1 },
        { name: 'filebook', maxCount: 1 }
        ]), 
    (req, res) => {
        const { title, description, authors, favorite, filecover, filebook } = req.body

        const newBook = new Book(title, description, authors, favorite||false, fileCover, fileName, fileBook)
        library.set(''+newBook.id, newBook)
        book.fileBook = req.file.filename
        book.fileName = req.file.originalname

        res.redirect('/books')
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

router.delete('/delete/:id', (req, res) => {
    const {id} = req.params
        
    if ( ! library.has(id) ) {
        res.redirect('/404')
        }

    library.delete(id)
    res.redirect('/books')
    })

module.exports = function(library) { library = library; return router; }