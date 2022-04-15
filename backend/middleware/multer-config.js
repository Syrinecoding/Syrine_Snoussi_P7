const multer = require('multer');
//const app = require('../app');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg' : 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, './images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('-').split('.');
            name.pop();
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        console.log('reqMulter', req.file);
        console.log('file', file)
    },
});


module.exports = multer({storage: storage}).single("image");