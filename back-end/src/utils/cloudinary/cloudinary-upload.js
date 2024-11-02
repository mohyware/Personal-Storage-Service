const cloudinary = require('../../config/Cloudinary')
const path = require('path');
const { BadRequestError } = require('../../errors');

const cloudUpload = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new BadRequestError("No file was uploaded");
        }

        const { buffer, originalname } = req.file;

        const options = {
            resource_type: 'auto', // Automatically detect resource type
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            public_id: originalname.split('.')[0] // Optional: use the original name without extension
        };

        const result = await cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return next(error);
            }
            req.body.public_id = result.public_id;
            res.locals.customData = {
                message: "Uploaded to Cloudinary successfully",
                public_id: result.public_id,
            };
            next();
        });

        // Create a stream to upload the buffer to Cloudinary
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return next(error);
            }
            req.body.public_id = result.public_id;
            res.locals.customData = {
                message: "Uploaded to Cloudinary successfully",
                public_id: result.public_id,
            };
            next();
        });

        // Pass the buffer to the stream
        stream.end(buffer);

    } catch (error) {
        console.log(error); // Log the error for debugging
        next(error);
    }
};


module.exports = cloudUpload;