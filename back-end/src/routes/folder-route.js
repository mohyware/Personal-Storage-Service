const express = require('express')
const router = express.Router()
const {
    getUserFolders,
    getFolderById,
    createFolder,
    updateFolder,
    deleteFolder,
} = require('../controllers/folder-controller')
const { nameValidator } = require('../validations/validate')

router.post('/', nameValidator, createFolder)
router.get('/', getUserFolders)
router.get('/:folderId', getFolderById)
router.patch('/:folderId', nameValidator, updateFolder);
router.delete('/:folderId', deleteFolder)

module.exports = router