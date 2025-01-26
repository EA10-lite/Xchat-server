const User = require("../../models/users");
const { verifyPassword } = require("../../utils/hashPassword");
const { SignToken } = require("./SignToken");

exports.LocalLogin = async (username, password) => {
    const user = await User.findOne({ username });

    if (!(await verifyPassword(password, user.password))) {
        throw new Error("Incorrect Password");
    }

    const userWithToken = await SignToken({
        _id: user._id,
        username: user.username,
    });
    
    return { ...userWithToken };
}