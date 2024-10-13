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

const getFileById = async (req, res, next) => {
    const { fileId } = req.params;

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
        // append url for local download
        req.body.url = file.url
        res.status(StatusCodes.OK).json({ file });
    } catch (err) {
        next(err)
    }
};

const createFile = async (req, res, next) => {
    const {
        file: { originalname, size, mimetype, path },
        body: { name, folderId, public_id },
        user: { id: userId }
    } = req;

    try {
        // check if there is passed id then if there is Folder exist with this id
        if (folderId) {
            const folder = await Folder.findUnique({ where: { id: Number(folderId) } });
            if (!folder) {
                throw new BadRequestError("no folder was found with this folder id");
            }
        }

        // name it with uploaded original name if user didn`t provide any name
        const fileName = name ? name : originalname;
        // if not in cloud store folder path in local
        const url = public_id ? public_id : path
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

        res.status(StatusCodes.CREATED).json({
            file,
            ...res.locals.customData,
        });
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
