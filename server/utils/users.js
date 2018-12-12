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
        var user = this.users.find(u=> u.id === id);
        this.users = this.users.filter(u=> u.id !== id);
        return user; 
    }

    getUser(id){
        var user = this.users.find(u => u.id === id);
        // var user = this.users.filter((user)=> user.id === id)[0];
        return user; 
    }

    isNewUser(name){
         var user = this.users.find(u=>u.name === name.trim().toUpperCase());
         if(user){
            return false;
         } else {
            return true; 
         }
    }
    getUserList(room){
        var usersInRoom = this.users.filter((user)=>{
            return user.room === room; 
        });
        var namesArray = usersInRoom.map((user)=>{ return user.name;});
        return namesArray; 
    }
    getRoomList(){
        var rooms = this.users.map(user=> user.room);
        return rooms; 
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