const cloudinary = require('../../config/Cloudinary');
const { BadRequestError } = require('../../errors');

const cloudUpload = async (req, res, next) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            throw new BadRequestError("No file was uploaded");
        }

        const { buffer, originalname } = req.file; // Extract buffer and original filename

        // Define upload options
        const options = {
            resource_type: 'auto', // Automatically detect resource type
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            public_id: originalname.split('.')[0] // Optional: use the original name without extension
        };

        // Create a stream to upload the buffer to Cloudinary
        const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                return next(error); // Handle any errors
            }

            // Store the public ID in the request body
            req.body.public_id = result.public_id;
            res.locals.customData = {
                message: "Uploaded to Cloudinary successfully",
                public_id: result.public_id,
            };
            next(); // Proceed to the next middleware
        });

        // Pass the buffer to the stream
        stream.end(buffer); // End the stream with the buffer

    } catch (error) {
        console.error(error); // Log the error for debugging
        next(error); // Pass the error to the next middleware
    }
};

module.exports = cloudUpload;
