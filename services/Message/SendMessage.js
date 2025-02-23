const Message = require("../../models/messages");
const User = require("../../models/users");

exports.SendMessage = async (room, sender, receiver, message) => {
    let _sender = await User?.findOne({ username: sender });
    let _receiver = await User?.findOne({ username: receiver });

    const new_message = await Message.create({
        room,
        sender: _sender?._id,
        receiver: _receiver?._id,
        message,
    });

    return new_message;
}