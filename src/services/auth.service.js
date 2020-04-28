const postingStore = require('../repository/postingStore.repository');
const userStore = require('../repository/userStore.repository')


const auth = {
    
    async checkPassword(id, password) {
        return await userStore.checkPassword(id, password)
    },

    async loginValidation(id, password) {
      if(await this.checkPassword(id, password)) {
        // console.log(id,password)
        return { loginStatus: true }
        }
        throw false
    },




    async userIdValidation(id) {
      let regExp = /\b^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$\b/
      return regExp.test(id);
    },
  
    async userIdAvailability(id) {
      return await userStore.checkIdIsRegistered(id)
    },
  //TODO: login처럼 route 가 아닌 서비스에서 하기.
    async registration(id, password) {
      const validability = await this.userIdValidation(id)
      const availability = await this.userIdAvailability(id)
      if(validability && availability) {
        return await userStore.createUser(id, password)
      }
    },

    


  }

module.exports = auth;
