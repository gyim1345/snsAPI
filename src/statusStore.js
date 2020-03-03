const statusStore = {
    currentUser: 'none',
    userOfActivePage: 'none',

getStatus() {
    return this.currentUser;
  },
  
getCurrentPageUser() {
    return this.userOfActivePage
},

}

module.exports = statusStore;
