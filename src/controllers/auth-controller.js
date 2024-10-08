const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const prisma = require("../config/prisma-client")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = prisma.user;

const register = async (req, res) => {
    const { email, userName, password } = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        data: {
            email: email,
            userName: userName,
            password: hashedPassword,
        },
    })
    const token = jwt.sign({ id: user.id, userName: user.userName },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });

    //const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { userName: user.userName }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findUnique({ where: { email: email } })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = jwt.sign({ id: user.id, userName: user.userName },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    res.status(StatusCodes.OK).json({ user: { userName: user.userName }, token })
}

const logout = (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

module.exports = {
    register,
    login,
    logout
}