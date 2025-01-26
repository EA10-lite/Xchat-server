const joi = require("joi");
const { errorResponse } = require("../utils/responseHandler");

exports.validator = (schema) => (req, res, next) => {
    const { error } = joi.object(schema).validate(req.body);
    if(error) return errorResponse(res, 400, error.details[0].message);

    next();
}