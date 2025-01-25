const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = app.listen(4000, () => {
    console.log('Server is running on port 3000');
});

// static files

app.use(express.static('public'));

app.use(
    cors({
      origin: ["https://x-chat-client.vercel.app/","http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
);
  
const io = new Server(server, {
    cors: {
      origin: 'https://x-chat-client.vercel.app/',
      methods:['GET','POST']
    }
})

// Socket setup 
// const io = socket(server);
io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        console.log(data);
        io.sockets.emit('chat', data);
    });
});
