const User = require("../../models/users");

exports.UserExist = async (query) => {
    const userExist = await User.exists(query);
  
    return userExist;
};