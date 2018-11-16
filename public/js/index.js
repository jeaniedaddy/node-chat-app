var socket =  io();
socket.on('connect',function(){
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     from: 'steve',
    //     text: 'Hello, I am fine'
    // });

});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

socket.on('newMessage',function(newMessage){
    console.log('newMessage', newMessage);
});