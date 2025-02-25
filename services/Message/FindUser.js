const User = require("../../models/users");


exports.FindUser = async (search) => {
    const users = await User.find({ username: { $regex: search, $options: 'i' } });

    return users;
}