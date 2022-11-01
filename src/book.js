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
    constructor(title = "", description = "", authors="", favorite="", fileCover="", fileName="") {
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileCover = fileCover
        this.fileName = fileName
        this.id = Book.maxid
        Book.maxid += 1
        }
    }

module.exports = Book;