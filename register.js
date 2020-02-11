const userStore = require('./userStore')

const register = {

  checkRegistered(id) {
    return userStore.userList.find(user => user.name === id.toString());
  },

  createUserOnRegister(id, password) {
    return userStore.createUser(id, password)
  },

  Registration(id, password) {
    if (this.checkRegistered(id))
      return { Message: "check Id" }
    this.createUserOnRegister(id, password)
    return { Message: "Registered" }
    //   checkRegistered(id, password) ? (
    //     createUserOnRegister(id, password),
    //     alert("Registered! Please login!") 
    //   )
    //   : alert("already registered");
    // };

  }
}

module.exports = register;
