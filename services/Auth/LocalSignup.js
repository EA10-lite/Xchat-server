const User = require("../../models/users");
const { hashPassword } = require("../../utils/hashPassword");
const { SignToken } = require("./SignToken");

exports.LocalSignup = async (username, password) => {
    const hashedPassword = await hashPassword(password);

    const user = new User({
        username, 
        password: hashedPassword
    });

    await user.save();

    const userWithToken = await SignToken({
        _id: user._id,
        username: user.username,
    });
    
    return { ...userWithToken };
}