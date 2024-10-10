const express = require('express')
const router = express.Router()
const {
    register,
    login,
    logout
} = require('../controllers/auth-controller')
const auth = require('../middleware/auth')
const loginLimiter = require('../middleware/login-limiter')

router.post('/register', loginLimiter, register)
router.post('/login', loginLimiter, login)
router.post('/logout', auth, logout);

module.exports = router