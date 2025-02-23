
const { CreateStatus, DeleteStatus, StatusExist } = require("../services/Status");
const { errorResponse, successResponse} = require("../utils/responseHandler");
const { UserExist } = require("../services/user/UserExist");

exports.createStatus  = async (req, res) => {
    try {
        const { _id } = req.user;
        const { caption } = req.body;

        if (!await UserExist(_id)) {
            return errorResponse(res, 404, "User not found");
        }

        const response = await CreateStatus(_id, caption);
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, 500, error)
    }
}

exports.deleteStatus = async () => {
    try {
        const { _id } = req.user;
        const { status_id } = req.params;

        if (!await UserExist({ _id })) {
            return errorResponse(res, 404, "User not found");
        }
        if (!await StatusExist({ created_by: _id, _id: status_id })) {
            return errorResponse(res, 404, "User not found");
        }

        const response = await DeleteStatus(status_id, _id);
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, 500, error)
    }
}