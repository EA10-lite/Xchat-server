const PrivateChat = require("../../models/chatRoom");
const User =  require("../../models/users");

exports.CreatePrivateRoom = async (user1, user2) => {
    let sender = await User?.findOne({ username: user1 });
    let receiver = await User?.findOne({ username: user2 });

    let room;

    if (sender && receiver) {
        room = await PrivateChat.findOne({ users: { $all: [sender?._id, receiver?._id] } });
    
        if (!room) {
            room = await PrivateChat.create({ users: [sender?._id, receiver?._id] });
        }
    }

    return room;
}