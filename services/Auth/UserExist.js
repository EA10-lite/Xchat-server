const User = require("../../models/users");

exports.UserExist = async (query) => {
    return User.exists(query);
}