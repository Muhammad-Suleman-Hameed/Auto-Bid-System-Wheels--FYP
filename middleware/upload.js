const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req, file ,callback) => {
        const uploadDir = path.join(__dirname, '../upload');
        callback(null , uploadDir)
    } ,
    filename: (req, file , callback) =>  {
        callback(null , Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage
})

module.exports = upload;