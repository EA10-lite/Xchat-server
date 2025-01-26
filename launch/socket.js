
const { Server } = require('socket.io');
const http = require("http");

module.exports = (app) => {
    const server  = http.createServer(app);
    
    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods:['GET','POST']
        }
    })
    
    io.on('connection', (socket) => {
        socket.on('chat', (data) => {
            console.log(data);
            io.sockets.emit('chat', data);
        });
    });
}
