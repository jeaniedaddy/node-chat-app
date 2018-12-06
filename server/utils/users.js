// [{
//     id: 
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor (){
        this.users = [];
    }

    addUser(id, name, room){
        var user = { id, name, room};
        this.users.push(user);
        return user; 
    }

    removeUser(id){

    }

    getUser(id){

    }
    getUserList(room){
        var usersInRoom = this.users.filter((user)=>{
            user.room === room; 
        });
        var userList = usersInRoom.map((user)=>{user.name});
        return userList; 
    }
}


module.exports = {Users};


// class Person {
//     constructor(name, age){
//         this.name = name; 
//         this.age = age; 
//     }

//     getPersonDescription(){
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('steve', 47);
// var description = me.getPersonDescription();
// console.log(description);