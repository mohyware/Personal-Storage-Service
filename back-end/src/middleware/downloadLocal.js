const fs = require('fs')
const path = require('path');
const download = (req, res, next) => {
    console.log('fileController.download: started')
    const filePath = req.body.url
    const absoluteFilePath = path.resolve(filePath);
    try {
        if (!fs.existsSync(absoluteFilePath)) {
            const err = new Error('File not found');
            err.status = 404;
            return next(err);
        }
        const file = fs.createReadStream(absoluteFilePath)
        const filename = (new Date()).toISOString()
        res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
        file.pipe(res)
    } catch (err) {
        next(err);

    }
}
module.exports = download