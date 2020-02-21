const statusStore = {
    currentUser: 1,
    userOfActivePage: 1,

getStatus() {
    return this.currentUser;
  },
  
getCurrentPageUser() {
    return this.userOfActivePage
},

}

module.exports = statusStore;
