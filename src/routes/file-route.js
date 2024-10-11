const express = require('express')
const router = express.Router()
const {
    getUserFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile,
} = require('../controllers/file-controller')
const upload = require('../middleware/upload')

router.post('/', upload, createFile)
router.get('/', getUserFiles)
router.get('/:fileId', getFileById)
router.patch('/:fileId', updateFile);
router.delete('/:fileId', deleteFile)

module.exports = router