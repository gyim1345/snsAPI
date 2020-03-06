const userStore = require('../repository/userStore')

const register = {

  async checkRegistered(id) {
    return await userStore.userList().find(user => user.name === id.toString());
  },

  async createUserOnRegister(id, password) {
    return await userStore.createUser(id, password)
  },

  async Registration(id, password) {
    if (await this.checkRegistered(id))
      return { Message: "Already Registered" }
    await this.createUserOnRegister(id, password)
    return { Message: "Registered" }
  }
}

module.exports = register;
