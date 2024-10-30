const cloudinary = require('../../config/Cloudinary')
const path = require('path');
const { BadRequestError } = require('../../errors');

const cloudUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new BadRequestError("no file was uploaded");
        }

        filePath = req.file.path;
        const absoluteFilePath = path.resolve(filePath);

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        const result = await cloudinary.uploader.upload(absoluteFilePath, options);

        console.log(result);
        req.body.public_id = result.public_id;
        res.locals.customData = {
            message: "uploaded to cloudinary successfully",
            public_id: result.public_id,
        };
        next()
    } catch (error) {
        next(error)
    }
};

module.exports = cloudUpload;