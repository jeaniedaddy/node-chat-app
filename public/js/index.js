var socket =  io();
socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
}); 

socket.on('newMessage',function(message){

    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('newMessage', message);

    var html = Mustache.render(template,{
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
    var template = jQuery('#message-location-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('newLocationMessage', message);
    
    var html = Mustache.render(template,{
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
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
