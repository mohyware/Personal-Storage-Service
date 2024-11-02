const multer = require('multer');
const path = require('path');
const { BadRequestError } = require('../errors');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = '/tmp/uploads';
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    try {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new BadRequestError('Unsupported file type. Please upload a PNG or JPEG image.'), false);
        }
    } catch (err) {
        cb(err, false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('file'); // 'myFile' is the name attribute of the file input field

module.exports = upload;