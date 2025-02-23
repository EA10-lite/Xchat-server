const Message = require("../../models/messages");

exports.GetMessages = async (room) => {
    const messages = await Message.find({ room }).sort({ createdAt: 1 });

    return messages;
}