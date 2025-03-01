const Message = require("../../models/messages");
const User = require("../../models/users");

exports.GetRecentChats = async (sender) => {
    const user  = await User?.findOne({ username: sender });

    const sender_messages = await Message
        .find({ sender: user?._id })
        .populate("receiver", "username")
        .populate("sender", "username")
        .sort({ updatedAt: 1 });
    const receiver_messages = await Message
        .find({ receiver: user?._id })
        .populate("receiver", "username")
        .populate("sender", "username")
        .sort({ updatedAt: 1 });

    const messages = [
        ...sender_messages,
        ...receiver_messages,
    ]


    const recent_chats = groupRecentChatsByRoomId(messages.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    return recent_chats;
}


const groupRecentChatsByRoomId = (chats) => {
    return chats.reduce((acc, chat)=> {
        if (!acc[chat.room]) {
            acc[chat.room] = [];
        }

        acc[chat.room].push(chat);
        return acc;
    }, {})
}