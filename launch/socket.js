
const { Server } = require('socket.io');
const http = require("http");

const { 
    SendMessage, 
    GetMessages,
    GetRecentChats,
    CreatePrivateRoom, 
} = require('../services/Message');

module.exports = (app) => {
    const server  = http.createServer(app);
    
    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods:['GET','POST']
        }
    })

    server.listen(4000, ()=> {
        console.log("Socket server running on port 5000");
    });

    const users = new Map(); // Store online users

    io.on('connection', (socket) => {

        // Handle user connection
        socket.on("userConnected", async (username) => {
            try {
                const recentChats = await GetRecentChats(username);
                socket.emit("updateRecentChats", recentChats);
                socket.join(username);
                console.log(username + ": connected!");
            } catch (error) {
                console.error("Error fetching recent chats:", error);
            }
        });

        // Join a private chat room
        socket.on("joinPrivateRoom", async ({ user1, user2 }) => {
            try {
                let room = await CreatePrivateRoom(user1, user2);
                socket.join(room._id.toString());
    
                const messages = await GetMessages(room._id);
                socket.emit("loadChatHistory", messages);
            } catch (error) {
                console.log("error", error); 
                if (error.cause) {
                    console.error("Cause of error:", error.cause);
                }  
            }
        });


        // Handle private chat messages
        socket.on("privateMessage", async ({ sender, receiver, message }) => {
            try {
                const room = await CreatePrivateRoom(sender, receiver);
    
                if (room) {
                    console.log("sending private message to room", room._id);
                    const new_message = await SendMessage(room?._id, sender, receiver, message);
                    io.to(room._id.toString()).emit("privateMessage", new_message);

                    // Update recent chats for both users
                    const senderChats = await GetRecentChats(sender);
                    const receiverChats = await GetRecentChats(receiver);

                    io.to(sender).emit("updateRecentChats", senderChats);
                    io.to(receiver).emit("updateRecentChats", receiverChats);
                }
            } catch (error) {
                console.log("error", error);
                if (error.cause) {
                    console.error("Cause of error:", error.cause);
                }
            }
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}
