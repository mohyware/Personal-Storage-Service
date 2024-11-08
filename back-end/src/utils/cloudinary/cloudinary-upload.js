const cloudinary = require('../../config/Cloudinary')
const { BadRequestError } = require('../../errors');
const streamifier = require("streamifier");

const cloudUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new BadRequestError("no file was uploaded");
        }

        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        };

        // Convert the upload_stream to a Promise
        const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                options,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        // Wait for the upload to complete
        const final = await uploadPromise;

        req.body.public_id = final.url;
        res.locals.customData = {
            message: "uploaded to cloudinary successfully",
            public_id: final.url,
        };
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = cloudUpload;