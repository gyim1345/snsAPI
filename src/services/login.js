const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')


const login = {
    
    async checkPassword(id, password) {
        return await userStore.checkPassword(id, password)
    },

    async loginValidation(id, password) {
        if(await this.checkPassword(id, password)) {
        return { statusMessage: 'LoggedIn', loginStatus: true }
        }
        return { statusMessage: 'Check Input', loginStatus: false }
    }

};

module.exports = login;
