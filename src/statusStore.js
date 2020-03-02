const statusStore = {
    currentUser: 'gibong',
    userOfActivePage: 'gibong',

getStatus() {
    return this.currentUser;
  },
  
getCurrentPageUser() {
    return this.userOfActivePage
},

}

module.exports = statusStore;
