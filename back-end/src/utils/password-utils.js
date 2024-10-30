const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const comparePassword = async (candidatePassword, password) => {
    const isMatch = await bcrypt.compare(candidatePassword, password)
    return isMatch
}
module.exports = {
    hashPassword,
    comparePassword
}