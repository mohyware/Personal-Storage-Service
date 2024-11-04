const { check } = require('express-validator')

const registerValidator = [
    check('userName')
        .trim()
        .isLength({ min: 5 })
        .withMessage('username must be at least 5 characters long'),
    check('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    check('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be between 8 and 64 characters long')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter'),
]

const nameValidator = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 1, max: 255 })
        .withMessage('Name must be between 1 and 255 characters')
        .matches(/^[^<>:"/\\|?*]+$/)
        .withMessage('Name contains invalid characters. Avoid characters like < > : " / \\ | ? *')
];

const loginValidator = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address'),
    check('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8, max: 64 })
        .withMessage('Password must be between 8 and 64 characters long')
];

module.exports = { registerValidator, loginValidator, nameValidator }