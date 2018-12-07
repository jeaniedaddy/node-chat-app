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

    // addUser
    it('should add a user to users', ()=>{
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

    // addUser(id, name, room)
    // removeUser(id)
    // getUser(id)
    // getUserList(room)

    
    // removeUser(id)
    it('should delete the user from users',()=>{
        var deletedUser = users.removeUser('2');
        expect(users.users).toEqual([{
                id: '1',
                name: 'steve',
                room: 'java'
            }, {
                id: '3',
                name: 'hena',
                room: 'c#'
        }]);
        expect(deletedUser).toEqual({
            id: '2',
            name: 'jeanie',
            room: 'java'
        });
    });

    it('should delete nothing from users',()=>{
        var deletedUser = users.removeUser('8');
        expect(users.users.length).toBe(3);
        expect(deletedUser).toBeFalsy();
    });

    // getUser(id)
    it('should find a user',()=>{
        var user = users.getUser('3');
        expect(user.name).toBe('hena');
    });

    it('should not find a user',()=>{
        var user = users.getUser('5');
        expect(user).toBeFalsy();
    });

    // getUserList(id)
    it('should return all users in a room',()=>{
        var userInJava = users.getUserList('java');
        expect(userInJava).toEqual(['steve','jeanie']);

        var userInJava = users.getUserList('tier');
        expect(userInJava).toEqual([]);
    });
});