const expect = require('expect');
const {Users} = require('./users');

describe('Users class', ()=>{
    var users = new Users();
    
    beforeEach(()=>{
        users.users = [{
            id: '1',
            name: 'steve',
            room: 'java'
        }, {
            id: '2',
            name: 'jeanie',
            room: 'java'
        }, {
            id: '3',
            name: 'hena',
            room: 'c#'
        }];
    });
    it('should ...', ()=>{
        var user = { 
            id : 123,
            name : 'steve',
            room : 'philadelphia'
        }

        var users = new Users();
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toContain(user);
        expect(users.users).toEqual([user]);
    });

    // it(should)

});