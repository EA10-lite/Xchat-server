const { sign } = require("jsonwebtoken");
const User = require("../../models/users");

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

exports.SignToken = async (payload) => {
    const access_token = sign(payload, JWT_SECRET, { expiresIn: "24h" });

    const refresh_token = sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "24h",
    });

    const user = await User.findOneAndUpdate(
        { _id: payload._id },
        { refresh_token },
        { new: true }
    )
    .select(
    "-__v -updatedAt -old_email"
    )
    .lean()
    .exec();

    delete user.password;

    return { access_token, ...user,};
};
