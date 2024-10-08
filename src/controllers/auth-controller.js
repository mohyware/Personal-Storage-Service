const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const prisma = require("../config/prisma-client")
const createJWT = require('../utils/jwt-utils');
const { hashPassword, comparePassword } = require('../utils/password-utils');

const User = prisma.user;

const register = async (req, res) => {
    const { email, userName, password } = req.body
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        data: {
            email: email,
            userName: userName,
            password: hashedPassword,
        },
    })
    const token = createJWT(user)
    res.status(StatusCodes.CREATED).json({ user: { userName: user.userName }, token })
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findUnique({ where: { email: email } })
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials')
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const token = createJWT(user)
        res.status(StatusCodes.OK).json({ user: { userName: user.userName }, token })
    } catch (error) {
        next(error);
    }
}

const logout = (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    logout
}