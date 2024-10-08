const prisma = require("./src/db/prisma")
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = prisma.user;


const getUser = async (req, res) => {
    const {
        user: { userId }
    } = req
    const user = await User.findByPk(userId);
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async (req, res) => {
    const {
        user: { userId }
    } = req
    const user = await User.destroy({ where: { id: userId } });
    res.status(StatusCodes.OK).json({ message: "User deleted successfully" })

}
const updateUser = async (req, res, next) => {
    const {
        user: { userId }
    } = req
    try {
        const user = await User.findByPk(userId);

        if (user.role !== 'Admin' && req.body.role === 'Admin') {
            throw new UnauthorizedError('Cant Modifying role. Admins only.');
        }

        await user.update({ ...req.body });

        res.status(StatusCodes.OK).json({ message: "User updated successfully", user });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
}
