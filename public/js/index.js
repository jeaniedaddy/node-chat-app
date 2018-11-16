var socket =  io();
socket.on('connect',()=>{
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     from: 'steve',
    //     text: 'Hello, I am fine'
    // });

});

socket.on('disconnect',()=>{
    console.log('disconnected from server');
});

socket.on('newMessage',(newMessage)=>{
    console.log('newMessage', newMessage);
});