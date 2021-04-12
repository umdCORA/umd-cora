const multer = require("multer")
const accepted_mimes = ['text/plain', 'text/html', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './newsletter_docs/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

var fileFilter = function (req, file, cb){
    var ext = file.mimetype;
    if(!accepted_mimes.includes(ext)){
        return cb('Not accepted type')
    }
    cb(null, true)
}

module.exports = multer({storage: storage, fileFilter: fileFilter})