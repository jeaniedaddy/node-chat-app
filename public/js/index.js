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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('newLocationMessage', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    a.attr('href', message.url)

    li.text(`${message.from} ${formattedTime}: `);
    li.append(a);
    
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageText = jQuery('[name=message]');
    socket.emit('createMessage', {
      from: 'User',
      text: messageText.val()
    }, function (data) {
        messageText.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    };

    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(location){
            console.log(location);
            locationButton.removeAttr('disabled').text('Send locaton');;
            socket.emit('createLocationMessage', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }, function (data) {
                console.log('good',data);
            });
        },function(){
            locationButton.removeAttr('disabled').text('Send locaton');;
            alert("Unable to fetch location.");
        });

});
