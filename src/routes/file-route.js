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
const download = require("../middleware/downloadLocal")

const cloudUpload = require('../utils/cloudinary/cloudinary-upload')
const cloudDownload = require('../utils/cloudinary/cloudinary-download')
// in cloud
router.post('/cloud/upload', upload, cloudUpload, createFile)
router.get('/cloud/download/:fileId', cloudDownload)
// in database
router.get('/', getUserFiles)
router.get('/:fileId', getFileById)
router.patch('/:fileId', updateFile);
router.delete('/:fileId', deleteFile)
// for local
router.post('/local/upload', upload, createFile)
router.get('/local/download/:fileId', getFileById, download) // to active remove response in getFileById controller
module.exports = router