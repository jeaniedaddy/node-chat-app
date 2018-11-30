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

socket.on('newLocationMessage',function(location){
    console.log('newLocationMessage', location);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    a.attr('href', location.url)

    li.text(`${location.from}: `);
    li.append(a);
    
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

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    };

    navigator.geolocation.getCurrentPosition(function(location){
            console.log(location);
            socket.emit('createLocationMessage', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }, function (data) {
                console.log('good',data);
            });
        },function(){
            alert("Unable to fetch location.");
        });

});
