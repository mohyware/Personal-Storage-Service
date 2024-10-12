const prisma = require("../config/prisma-client");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const File = prisma.file;

const getUserFiles = async (req, res) => {
    const {
        user: { id: userId }
    } = req;

    const files = await File.findMany({
        where: { userId },
        include: {
            folder: true,
        },
    });
    res.status(StatusCodes.OK).json({ files });
};

const getFileById = async (req, res) => {
    const { fileId: fileId } = req.params;

    try {

        const file = await File.findUnique({
            where: { id: Number(fileId) },
            include: {
                folder: true,
            },
        });

        if (!file) {
            throw new NotFoundError(`No file found with id ${fileId}`);
        }

        res.status(StatusCodes.OK).json({ file });
    } catch (err) {
        next(err)
    }
};

const createFile = async (req, res, next) => {
    const {
        file: { originalname: name, size, mimetype, path: url, folderId },
        user: { id: userId }
    } = req;

    try {
        if (!name || !size || !mimetype || !url) {
            throw new BadRequestError("All file details (name, size, mimeType, and URL) are required");
        }

        const file = await File.create({
            data: {
                name,
                size,
                mimeType: mimetype,
                url,
                userId,
                folderId: folderId ? Number(folderId) : null,
            },
        });

        res.status(StatusCodes.CREATED).json({ file });
    } catch (err) {
        next(err);
    }
};

const updateFile = async (req, res, next) => {
    const { id: fileId } = req.params;
    const { name, size, mimeType, url, folderId } = req.body;
    try {
        if (!fileId) {
            throw new BadRequestError("Please  provide a valid file id");
        }
        const file = await File.update({
            where: { id: Number(fileId) },
            data: {
                name,
                size,
                mimeType,
                url,
                folderId: folderId ? Number(folderId) : null,
            },
        });

        res.status(StatusCodes.OK).json({ message: "File updated successfully", file });
    } catch (err) {
        next(err);
    }
};

const deleteFile = async (req, res) => {
    const { id: fileId } = req.params;

    await File.delete({
        where: { id: Number(fileId) },
    });

    res.status(StatusCodes.OK).json({ message: "File deleted successfully" });
};

module.exports = {
    getUserFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile,
};
