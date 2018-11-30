var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe("generateMessage", () => {
    it('shold generate correct message object',()=>{
        var from = 'jeanie';
        var text = 'hello';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
});

describe("generateLocationessage", () => {
    it('shold generate correct Location object',()=>{
        var from = 'hena';
        var latitude = 1;
        var longitude = 1; 
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        var location = generateLocationMessage(from, latitude, longitude);
        expect(location.createdAt).toBeA('number');
        expect(location.from).toBe(from);
        expect(location.url).toBe(url);
        expect(location).toInclude({from,url});

    })
});

