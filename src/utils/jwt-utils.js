const jwt = require('jsonwebtoken');

createJWT = function (user) {
    if (!process.env.JWT_SECRET || !process.env.JWT_LIFETIME) {
        throw new Error("Missing JWT configuration in environment variables.");
    }

    return jwt.sign(
        { id: user.id, userName: user.userName },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
        }
    )
}

module.exports = createJWT