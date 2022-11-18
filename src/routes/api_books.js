const Book = require('../book')
const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const fileupload = require('../middleware/file')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

let library = new Map()
let COUNTER_URL = 'localhost';

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
    
    
router.get('/:id', async (req, res) => {
    const book = library.get(req.params.id)

    if( !book ) {
        res.redirect('/404')
        }
    const response = await fetch(`${COUNTER_URL}/counter/${req.params.id}/incr`, {method:'POST'});
    const {cnt: count} = await response.json();

    res.render('books/view', {
        title: "Book | view",
        book: book,
        count: count
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

module.exports = function(library,cnt_url) { library = library; COUNTER_URL = cnt_url; return router; }