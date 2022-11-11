const fs = require('fs')
const os = require('os')

module.exports = (req,res,next) => {
    const {url,method} = req

    const data = `${Date.now()} + ${method} + ${url}` 
    fs.appendFile('server.log', data + os.EOL, (err) => {
        if (err) throw err;
        })

    next()
}