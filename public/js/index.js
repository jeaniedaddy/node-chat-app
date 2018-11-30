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

socket.on('newMessage',function(message){
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function (data) {
        console.log('good',data);
    });
});


jQuery('#send-location').on('click', function(){
    if(!navigator.geolocation){
        return alert('no gelocation feature.');
    };

    navigator.geolocation.getCurrentPosition(function(locatoin){
        console.log(location);
        // socket.emit('createLocationMessage', {
            
        //     from: 'User',
        //     text: jQuery('[name=message]').val()
        //   }, function (data) {
        //       console.log('good',data);
        // });
    }, function(){
        alert('unable to fetch geolocation.');
    });
});
