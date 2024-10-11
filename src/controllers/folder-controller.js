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

const getFolderById = async (req, res) => {
    const { id: folderId } = req.params;

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
};

const createFolder = async (req, res) => {
    const {
        body: { name, parentFolderId },
        user: { id: userId }
    } = req;

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
};

const updateFolder = async (req, res) => {
    const { id: folderId } = req.params;
    const { name, parentFolderId } = req.body;

    const folder = await Folder.update({
        where: { id: Number(folderId) },
        data: {
            name,
            parentFolderId: parentFolderId ? Number(parentFolderId) : null,
        }
    });

    res.status(StatusCodes.OK).json({ message: "Folder updated successfully", folder });
};

const deleteFolder = async (req, res) => {
    const { id: folderId } = req.params;

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
