const Status = require("../../models/status");

export const DeleteStatus = async (status_id, user_id) => {
    const status = await Status.findOneAndDelete({ _id: status_id, created_by: user_id });

    return status;
}