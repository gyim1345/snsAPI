const baseurl = "http://localhost:8080";
const userStore = {
  users: [
    {
      name: "gibong",
      userId: 1,
      userFollow: ["", "guy"],
      userURL: `${baseurl}/static/images/user1.png`,
      password: "gb123"
    },
    {
      name: "guy",
      userId: 2,
      userFollow: ["", "gibong"],
      userURL: `${baseurl}/static/images/user2.png`,
      password: "guy123"
    },
    {
      name: "noone",
      userId: 3,
      userFollow: [""],
      userURL: `${baseurl}/static/images/user3.png`,
      password: "noonepwd"
    },
    {
      name: "",
      userId: 0,
      userFollow: [""],
      userURL: ``,
      password: ""
    }
  ],

  get userList() {
    return this.users;
  },

  get usersLength() {
    return this.users.length;
  },

  getUserName(userName) {
    return this.users.find(userInfo => userInfo.name === userName).name;
  },

  getFollowerFromUser(userName) {
    if (userName !== undefined)
      return this.users.find(userInfo => userInfo.name === userName).userFollow;
    return "empty";
  },

  getFollowerNumberOfUser(userName) {
    return (
      this.users.find(userInfo => userInfo.name === userName).userFollow
        .length - 1
    );
  },

  getUserPassword(userName) {
    return this.users.find(userInfo => userInfo.name === userName).password;
  },

  addFollower(userName, targetUserName) {
    return this.users
      .find(userInfo => userInfo.name === userName)
      .userFollow.push(targetUserName);
  },

  getUserImage(userName) {
    return this.users.find(userInfo => userInfo.name === userName).userURL;
  },

  createComment(id, titlee) {
    this.users = [
      ...this.users,
      {
        id: Date.Now(),
        postLId: id,
        title: titlee
      }
    ];
  },

  createUser(id, pwd) {
    this.users = [
      ...this.users,
      {
        name: id,
        userId: this.usersLength,
        userFollow: [""],
        userURL: `${baseurl}/static/images/profilepicture.png`,
        password: pwd
      }
    ];
  }
};

module.exports =  userStore;
