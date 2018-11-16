const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('New user connected');

    //message event handlers
    socket.emit('newMessage',{ 
        from: 'jeanie',
        text: 'Hi jeanie',
        createdAt: 123
    });

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{
    console.log(`server is running on ${port} port`);
}); 