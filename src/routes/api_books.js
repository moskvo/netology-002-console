const Book = require('../book')
const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileupload = require('../middleware/file')

const err404answer = {errcode: 404, errmsg: "Page not found"}

let library = new Map()

router.get('/', (req, res) => {
    res.render("books/index", {
        title: "Library",
        books: [...library.values()],
        })
    })

router.get('/create', (req, res) => {
    res.render("books/create", {
            title: "Book | create",
            book: {},
        });
    });

router.post('/create', 
    fileupload.fields([
        { name: 'filecover', maxCount: 1 },
        { name: 'filebook', maxCount: 1 }
        ]), 
    (req, res) => {
        const newBook = Book.fromBody(req.body,req.files)
        library.set(''+newBook.id, newBook)
        res.redirect('/books')
    })
    
    
router.get('/:id', (req, res) => {
    const book = library.get(req.params.id)

    if( !book ) {
        res.redirect('/404')
        }

    res.render('books/view', {
        title: "Book | view",
        book: book
        })
    })

router.get('/:id/download', async (req,res) => {
    const book = library.get(req.params.id)

    if( !book || !book.fileBook ) {
        res.redirect('/404')
        }

    const filePath = `./books/${book.fileBook}`;
    res.status(201)
    res.download(filePath,book.fileName);
    })
       
router.get('/update/:id', (req, res) => {
    const book = library.get(req.params.id)

    if( !book ) {
        res.redirect('/404')
        }

    res.render('books/update', {
        title: "Book | update",
        book: book
        })
    });    

router.post('/update/:id', 
    fileupload.fields([
        { name: 'filecover', maxCount: 1 },
        { name: 'filebook', maxCount: 1 }
        ]), 
    (req, res) => {
        const bookupdates = Book.fromBody(req.body,req.files)
        const id = req.params.id
        const book = library.get(id)

        if (book){
            book.update(bookupdates)
            res.redirect(`/books/${id}`)
            } 
        else {
            res.redirect('/404')
            }
    })

router.post('/delete/:id', (req, res) => {
    const {id} = req.params
        
    if ( ! library.has(id) ) {
        res.redirect('/404')
        }

    library.delete(id)
    res.redirect('/books')
    })

module.exports = function(library) { library = library; return router; }