const {errorResponse, successResponse} = require("../utils/responseHandler");
const { LocalLogin, LocalSignup, UserExist } = require("../services/Auth")

exports.login = async (req, res) => {
    try {
        const { username, password} = req.body;

        if(!await UserExist({ username })) {
            return errorResponse(res, 400, "Account with username not found!");
        }

        const response = await LocalLogin(username, password);
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, error?.message ? 400 : 500, error?.message ? error?.message : error);
    }
}

exports.register = async (req, res) => {
    try {
        const { username, password} = req.body;

        if(await UserExist({ username })) {
            return errorResponse(res, 400, "Username already taken, try another one!");
        }

        const response = await LocalSignup(username, password);
        successResponse(res, 200, response);
    } catch (error) {
        errorResponse(res, error?.message ? 400 : 500, error?.message ? error?.message : error);
    }
}