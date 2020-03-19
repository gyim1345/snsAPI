const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')

const login = {
  
    async loginValidation(Id, Password) {
        let regExp = /[a-zA-Z0-9@]$/
        if(!regExp.test(Id)){
            return { statusMessage: 'Check Input', loginStatus: false }
            }
        if(await userStore.checkIdIsRegistered(Id)) {
            return { statusMessage: 'Check Input', loginStatus: false }
        }
        if(!await userStore.checkPassword(Id,Password)) {
            return { statusMessage: 'Check Input', loginStatus: false }
        }
   
        return { statusMessage: 'LoggedIn', loginStatus: true }
    }

};

module.exports = login;
