const Status = require("../../models/status");

exports.StatusExist = async (query) => {
    const userExist = await Status.exists(query);
  
    return statusExist;
};