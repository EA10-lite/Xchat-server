const { Schema, Types, model } = require("mongoose");

const message = new Schema({
    text: { type: String, required: true },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    recipient: { type: Types.ObjectId, ref: "User", required: true },
    delivered: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = model("Message", message);