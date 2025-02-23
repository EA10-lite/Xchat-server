const { Schema, model, Types } = require("mongoose");

const privatechat = Schema({
    users: [{ type: Types.ObjectId, ref: "User" }],
});

module.exports = model("PrivateChat", privatechat);