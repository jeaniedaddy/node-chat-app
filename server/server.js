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

    if (!users.isNewUser(params.name)){
      return callback('Another same name user is in chatting. use differnt user name');
    }

    var user = {
      id: socket.id,
      name: params.name.trim().toUpperCase(),
      room: params.room.trim().toUpperCase()
    };

    console.log('new user', user);
    
    users.removeUser(user.id);
    users.addUser(user.id, user.name, user.room);
    socket.join(user.room);

    // io.to(user.room).emit('roomName', user.room);
    io.to(user.room).emit('usersUdate', users.getUserList(user.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} joined`));
    callback();
  });

  //socket.leave('The Office Fans');

  // io.emit -> io.to('The Office Fans').emit
  // socket.broadcast.emit -> socket.boadcast.to('The Office Fans').emit
  // socket.emit

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (position, callback) => {
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, position.latitude, position.longitude));
    }
    callback();
  });
  
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    console.log('user left', user);
    
    if(user){
      io.to(user.room).emit('usersUdate', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
    
  });
});

app.get('/rest_api/getRoomList',(req,res)=>{
  var rooms = users.getRoomList();
  console.log(rooms);
  return res.send(rooms);
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
