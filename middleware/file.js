const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null,'books')
        },
    filename(req, file, cb){
        cb(null, `${file.originalname}-${Date.now()}`)
        }
    })

module.exports = multer({storage})