const multer = require('multer');
const { BadRequestError } = require('../errors');

const storage = multer.memoryStorage();


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

const handleUploadErrors = (err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return next(new BadRequestError("File size exceeds the 1MB limit."));
            }
            return next(new BadRequestError(`Multer error: ${err.message}`));
        } else if (err instanceof BadRequestError) {
            return next(err);
        } else {
            return next(err);
        }
    }

    next();
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } // 1MB file size limit
}).single('file'); // 'myFile' is the name attribute of the file input field

module.exports = { upload, handleUploadErrors };