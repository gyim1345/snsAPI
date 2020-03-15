const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')

const login = {
  
    async loginValidation(Id, Password) {
        console.log(Id !== /([A-Za-z0-9])\w+/g)
        if(Id !== /([A-Za-z0-9])\w+/g ){
            return 'Check Input';
            }
        const [getDuplicateId] = await userStore.getUserName(Id);
        console.log(getDuplicateId);
        if (getDuplicateId === undefined) {
        return 'Check Duplication';
    }
        
        console.log('hohohooh')

        return 'asdasd'
    }

};

module.exports = login;
