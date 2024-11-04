const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const prisma = require("../config/prisma-client")
const createJWT = require('../utils/jwt-utils');
const { hashPassword, comparePassword } = require('../utils/password-utils');

const User = prisma.user;

const register = async (req, res, next) => {
    const { email, userName, password } = req.body
    try {
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
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password')
        }
        const user = await User.findUnique({ where: { email: email, deleted: false } })
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials')
        }

        const isPasswordCorrect = await comparePassword(password, user.password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const cookieMaxAge = Number(process.env.COOKIE_MAX_AGE) || 3600000;
        const token = createJWT(user)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: cookieMaxAge,
            sameSite: 'None'
        });
        res.status(StatusCodes.OK).json({ user: { userName: user.userName }, token })
    } catch (error) {
        next(error);
    }
}
const getStatus = (req, res) => {
    res.json({ isAuthenticated: true });

};

const logout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    getStatus,
    logout
}