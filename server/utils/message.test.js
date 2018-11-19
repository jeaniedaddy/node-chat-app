var expect = require('expect');
var {generateMessage} = require('./message');

describe("generateMessage", () => {
    it('shold generate message',()=>{
        var from = 'jeanie';
        var text = 'hello';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    })
});


