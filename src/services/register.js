const userStore = require('../repository/userStore')

const register = {

  async checkRegistered(id) {
    return await userStore.userList().find(user => user.name === id.toString());
  },

  async createUserOnRegister(id, password) {
    return await userStore.createUser(id, password)
  },

  async Registration(id, password) {

    let regExp = /[a-zA-Z0-9]$/
    if(!regExp.test(id)){
      console.log('321')
        return { Message: "Check Input", status: false }
        }
    if (!(await userStore.checkIdIsRegistered(id))){
      return { Message: "Check Input" , status: false}
      }
    userStore.createUser(id, password)
    return { Message: "Registered", status: true }
    
  }
}

module.exports = register;
