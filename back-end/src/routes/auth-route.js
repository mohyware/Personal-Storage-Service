const express = require('express')
const router = express.Router()
const {
    register,
    login,
    getStatus,
    logout
} = require('../controllers/auth-controller')
const auth = require('../middleware/auth')
const loginLimiter = require('../middleware/login-limiter')
const { registerValidator, loginValidator } = require('../validations/validate')

router.post('/register', loginLimiter, registerValidator, register)
router.post('/login', loginLimiter, loginValidator, login)
router.get('/status', auth, getStatus)
router.delete('/logout', auth, logout);

module.exports = router