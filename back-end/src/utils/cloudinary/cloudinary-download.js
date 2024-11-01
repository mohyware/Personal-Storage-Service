const cloudinary = require('../../config/Cloudinary')
const fs = require('fs');
const axios = require('axios');
const prisma = require("../../config/prisma-client");
const File = prisma.file
const { StatusCodes } = require('http-status-codes');

const cloudDownload = async (req, res) => {
    const { fileId } = req.params;
    try {
        const file = await File.findUnique({ where: { id: Number(fileId) } });
        if (!file) {
            throw new NotFoundError(`No file found with id ${fileId}`);
        }
        // finally get publicId to get the file
        const publicId = file.url

        const result = cloudinary.url(publicId, {
            secure: true,
            resource_type: 'image'
        });
        const response = await axios({
            url: result,
            method: 'GET',
            responseType: 'stream'
        });
        res.status(StatusCodes.OK).json({ link: result });
        return;
        // download
        const writer = fs.createWriteStream('./downloaded_image.jpg');
        response.data.pipe(writer);
        writer.on('finish', () => console.log('File downloaded successfully.'));
        writer.on('error', (err) => console.error('Error downloading file:', err));

        res.status(StatusCodes.OK).json({ message: "File downloaded successfully" });
    } catch (error) {
        console.error('Error fetching file from Cloudinary:', error);
    }
};

module.exports = cloudDownload;