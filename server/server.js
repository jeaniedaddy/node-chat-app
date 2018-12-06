const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} =  require('./utils/validation');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required.');
    }

    socket.join(params.room);
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));
    callback();
  });

  

  //socket.leave('The Office Fans');

  // io.emit -> io.to('The Office Fans').emit
  // socket.broadcast.emit -> socket.boadcast.to('The Office Fans').emit
  // socket.emit

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (position, callback) => {
    console.log('createLocationMessage', position);
    io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
    callback();
  });
  
  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
