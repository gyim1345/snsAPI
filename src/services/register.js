const userStore = require('../repository/userStore')

const register = {

  async checkRegistered(id) {
    return await userStore.userList().find(user => user.name === id.toString());
  },

  async createUserOnRegister(id, password) {
    return await userStore.createUser(id, password)
  },

  async Registration(id, password) {
    console.log('registered3')
    if (!userStore.checkIdIsRegistered(id)){
      if(!userStore.checkPassword(id, password)){
      return { Message: "Check" }
      }
    }
    userStore.createUser(id, password)
    return { Message: "Registered" }
  }
}

module.exports = register;
