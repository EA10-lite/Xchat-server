const { Schema, Types, model } = require("mongoose");

const message = Schema({
    room: { type: Types.ObjectId, required: true, ref: "PrivateChat"},
    message: { type: String, required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: { type: Types.ObjectId, ref: "User", required: true },
}, { timestamps: true })

module.exports = model("Message", message);