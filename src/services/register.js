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
    console.log(id);
    let regExp = /[a-zA-Z0-9]$/
    if(!regExp.test(id)){
        return { Message: "Check Input" }
        }
    if (!userStore.checkIdIsRegistered(id)){
      if(!userStore.checkPassword(id, password)){
      return { Message: "Check Input" }
      }
    }
    userStore.createUser(id, password)
    return { Message: "Registered" }
  }
}

module.exports = register;
