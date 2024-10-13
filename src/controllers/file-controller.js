const prisma = require("../config/prisma-client");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const File = prisma.file;
const Folder = prisma.folder;

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
        file: { originalname: originalname, size, mimetype, path: url },
        body: { name, folderId },
        user: { id: userId }
    } = req;

    try {
        if (!originalname || !size || !mimetype || !url) {
            throw new BadRequestError("All file details (name, size, mimeType, and URL) are required");
        }
        // name it with uploaded original name if user didnt provide any name
        const fileName = name ? name : originalname;
        const file = await File.create({
            data: {
                name: fileName,
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
    const { fileId } = req.params;
    const { name, folderId } = req.body;
    try {
        // check file exist or not
        const oldFile = await File.findUnique({ where: { id: Number(fileId) } });
        if (!oldFile) {
            throw new BadRequestError("no file was found with this id");
        }
        // check Folder exist or not
        const folder = await Folder.findUnique({ where: { id: Number(folderId) } });
        if (!folder) {
            throw new BadRequestError("no folder was found with this folder id");
        }
        const file = await File.update({
            where: { id: Number(fileId) },
            data: {
                name,
                folderId: folderId,
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
