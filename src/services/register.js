const userStore = require('../repository/userStore')

const register = {

  checkRegistered(id) {
    return userStore.userList.find(user => user.name === id.toString());
  },

  createUserOnRegister(id, password) {
    return userStore.createUser(id, password)
  },

  Registration(id, password) {
    if (this.checkRegistered(id))
      return { Message: "Already Registered" }
    this.createUserOnRegister(id, password)
    return { Message: "Registered" }
  }
}

module.exports = register;
