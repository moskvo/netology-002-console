/*
book = {
    id: "string",
    title: "string",
    description: "string",
    authors: "string",
    favorite: "string",
    fileCover: "string",
    fileName: "string",
    fileBook: "string"
    }
    */
class Book {
    static maxid = 0;
    constructor(title = null, description = null, authors=null, favorite=null, fileCover=null, fileName=null, fileBook=null) {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.fileBook = fileBook
        this.id = Book.maxid
        Book.maxid += 1
        }
    
    static fromBody(body){
        const filecover = body.files.find(file => file.fieldname === 'filecover')
        const filebook = body.files.find(file => file.fieldname === 'filebook')
        return new Book( body.title, body.description, body.authors, body.favorite||false, filecover.filename, filebook.originalname, filebook.filename )
        }
    }

module.exports = Book;