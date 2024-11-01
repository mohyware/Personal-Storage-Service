const prisma = require("../config/prisma-client");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const Folder = prisma.folder;

const getUserFolders = async (req, res) => {
    const {
        user: { id: userId }
    } = req;

    const folders = await Folder.findMany({
        where: { userId },
        include: {
            subFolders: true,
            files: true,
        }
    });
    res.status(StatusCodes.OK).json({ folders });
};

const getFolderById = async (req, res, next) => {
    const { folderId: folderId } = req.params;
    try {

        const folder = await Folder.findUnique({
            where: { id: Number(folderId) },
            include: {
                subFolders: true,
                files: true,
            }
        });

        if (!folder) {
            throw new BadRequestError(`No folder found with id ${folderId}`);
        }

        res.status(StatusCodes.OK).json({ folder });
    } catch (err) { next(err) }
};

const createFolder = async (req, res, next) => {
    const {
        body: { name, parentFolderId },
        user: { id: userId }
    } = req;

    try {

        if (!name) {
            throw new BadRequestError("Folder name is required");
        }

        const folder = await Folder.create({
            data: {
                name,
                userId,
                parentFolderId: parentFolderId ? Number(parentFolderId) : null,
            }
        });

        res.status(StatusCodes.CREATED).json({ folder });
    } catch (err) {
        next(err)
    }
};

const updateFolder = async (req, res, next) => {
    const { folderId: folderId } = req.params;
    const { name, parentFolderId } = req.body;
    try {
        // check folder exist or not
        const oldFolder = await Folder.findUnique({ where: { id: Number(folderId) } });
        if (!oldFolder) {
            throw new BadRequestError("no folder was found with this folder id");
        }
        // check if parentFolder passed if it exist or not
        if (parentFolderId) {
            const parentFolder = await Folder.findUnique({ where: { id: Number(parentFolderId) } });
            if (!parentFolder) {
                throw new BadRequestError("no folder was found with this parent folder id");
            }

            if (parentFolderId == folderId) {
                throw new BadRequestError("folder cant be parent for itself!");
            }
        }
        const folder = await Folder.update({
            where: { id: Number(folderId) },
            data: {
                name,
                parentFolderId: parentFolderId,
            }
        });

        res.status(StatusCodes.OK).json({ message: "Folder updated successfully", folder });
    } catch (err) {
        next(err)
    }
};

const deleteFolder = async (req, res) => {
    const { folderId: folderId } = req.params;

    await Folder.delete({
        where: { id: Number(folderId) },
    });

    res.status(StatusCodes.OK).json({ message: "Folder deleted successfully" });
};

module.exports = {
    getUserFolders,
    getFolderById,
    createFolder,
    updateFolder,
    deleteFolder,
};
