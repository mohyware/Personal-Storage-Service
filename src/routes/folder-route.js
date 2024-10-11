const express = require('express')
const router = express.Router()
const {
    getUserFolders,
    getFolderById,
    createFolder,
    updateFolder,
    deleteFolder,
} = require('../controllers/folder-controller')

router.post('/', createFolder)
router.get('/', getUserFolders)
router.get('/:folderId', getFolderById)
router.patch('/:folderId', updateFolder);
router.delete('/:folderId', deleteFolder)

module.exports = router