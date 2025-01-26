const joi = require("joi");

exports.auth_schema = {
    username: joi.string().required(),
    password: joi.string().required()
}