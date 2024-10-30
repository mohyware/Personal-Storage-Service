const express = require('express')
const router = express.Router()
const {
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/user-controller')


router.get('/', getUser)
router.patch('/', updateUser);
router.delete('/', deleteUser)

module.exports = router