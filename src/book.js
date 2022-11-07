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

    update(bookupdates){
        for( let e of Object.entries(bookupdates)){
            if( e[0] != "id" && e[1] !== undefined && e[1] !== null )
                this[e[0]] = e[1]
            }
        }
    
    static fromBody(body, files){
        let filecover = null
        let filebook = null, filebookname = null
        if( files && files.filecover)
            filecover = files.filecover[0].filename; //find(file => file.fieldname === 'filecover')
        if( files && files.filebook) {
            filebook = files.filebook[0].filename;
            filebookname = files.filebook[0].originalname; //find(file => file.fieldname === 'filebook')
            }

        return new Book( body.title, body.description, body.authors, body.favorite||false, filecover, filebookname, filebook )
        }
    }

module.exports = Book;