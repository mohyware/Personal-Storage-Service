const prisma = require("../config/prisma-client")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { hashPassword } = require('../utils/password-utils');

const User = prisma.user;


const getUser = async (req, res) => {
    const {
        user: { id: userId }
    } = req

    const user = await User.findUnique({ where: { id: userId } });
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res, next) => {
    const {
        user: { id: userId }
    } = req
    try {
        const user = await User.findUnique({ where: { id: userId } });
        if (user.email === 'example@gmail.com') {
            throw new BadRequestError(`Come on i made it for everyone to test the app don't be like that`)
        }
        // soft delete
        await User.update({
            where: { id: userId },
            data: { deleted: true },
        });
        //await User.delete({ where: { id: userId } });
        res.status(StatusCodes.OK).json({ message: "User deleted successfully" })
    } catch (err) {
        console.log(err)
        next(err);
    }

}
const updateUser = async (req, res, next) => {
    const {
        user: { id: userId },
        body: { email, userName, password }
    } = req
    try {
        if (!email && !userName && !password) {
            throw new BadRequestError('You must provide a value for any field to proceed with the update')
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.update({
            where: { id: userId },
            data: {
                email: email,
                userName: userName,
                password: hashedPassword,
                updatedAt: Date.now()
            },
        });
        res.status(StatusCodes.OK).json({ message: "User updated successfully", user });
    } catch (error) {
        next(error);
    }

};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
}
