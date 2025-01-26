const { Schema, Types, model } = require("mongoose");

const user = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 24 },
}, { timestamps: true })

module.exports = model("User", user);