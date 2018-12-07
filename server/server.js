const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} =  require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '..', 'public');

var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback)=>{
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }
    console.log('new user', {id: socket.id, name: params.name, room: params.room});

    
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    socket.join(params.room);

    io.to(params.room).emit('usersUdate', users.getUserList(params.room));

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
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    callback();
  });

  socket.on('createLocationMessage', (position, callback) => {
    console.log('createLocationMessage', position);
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, position.latitude, position.longitude));
    callback();
  });
  
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    console.log('user left', user);
    io.to(user.room).emit('usersUdate', users.getUserList(user.room));
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
