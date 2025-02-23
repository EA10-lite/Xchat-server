const { Types, Schema, model } = require("mongoose");

const status = new Schema({
    created_by: { type: Types.ObjectId, required: true },
    caption: { type: String, minLength: 1, maxLength: 1000 },
    viewers: [{ type: Types.ObjectId }],
}, { timestamps: true });

module.exports = model("status", status);