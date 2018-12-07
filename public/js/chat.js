var socket =  io();

function scrollToBottom(){
    var messages = $('#messages');
    messages.scrollTop(messages.prop("scrollHeight"));
};

socket.on('connect',function(){
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
    // console.log('connected to server');
});

socket.on('disconnect',function(){
}); 

socket.on('usersUdate',function(usersList){
    var ol = $('<ol></ol>');
    usersList.forEach(function(user){
        ol.append(`<li>${user}</li>`);
    });
    $('#users').html(ol);
    console.log('usersUpdate', usersList);
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
    scrollToBottom();
});

socket.on('newLocationMessage',function(message){
    var template = jQuery('#message-location-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('newLocationMessage', message);
    
    var html = Mustache.render(template,{
        from:message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageText = jQuery('[name=message]');
    socket.emit('createMessage', {
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
