const baseurl = "http://localhost:3000";
import userSchemaModel from '../model/user';

const userStore = {

  async userList() {
    return await userSchemaModel.find();
  },

  async usersLength() {
    return await userSchemaModel.find().length;
  },

  async getUserImage(user) {
    return (await userSchemaModel.find(user)).userURL
  },

  async getUserName(userName) {
    return await userSchemaModel.find({ name: userName });
  },

  async getFollowerFromUser(userName) {
    if (userName !== undefined) {
      const [ userInfo ]  = await userSchemaModel.find({ name: userName })
      // console.log(userInfo.userFollow)
      return userInfo.userFollow;
    }
    return "empty";
  },

//   async getRandomUser(user) {
//     const users = await userSchemaModel.find()
//     return users.filter(it => !it.userFollow.includes(user)&& it.name !== user && it.name !== '');
// },

async getRandomUser(user) {
      const users = await userSchemaModel.find()
      const [ currentUserInfo ] = users.filter(it => it.name === user);
      const randomUser = users.filter(it => !currentUserInfo.userFollow.includes(it.name) && it.name !== user)
      return randomUser
  },  
  

  async getFollowerNumberOfUser(userName) {
    const [ userInfo ]  = await userSchemaModel.find({ name: userName })
    return userInfo.userFollow.length -1;
  },

  async getUserPassword(userName) {
    return await userSchemaModel.find({ name: userName }).password;
  },

  async addFollower(follower, currentUser) {
    console.log(follower, currentUser);
    return await userSchemaModel.findOne({ name: currentUser }, (err, userModel) => {
      console.log(userModel);
      console.log(follower);
      userModel.userFollow.push(follower);
      userModel.save();
    })
  },

  async getUserImage(userName) {
    const [userInfo] = await userSchemaModel.find({ name: userName });
    return userInfo.userURL;
  },

  async checkIdIsRegistered(Id) {
    return (await userSchemaModel.find({ name: Id })) === undefined
  },

  async checkPassword(Id, Password) {
    console.log((await userSchemaModel.findOne({ name: Id})).password, Password)
    return  (await userSchemaModel.findOne({ name: Id})).password === Password;
  },

  async performLogin(Id, Password) {
    // console.log(Id,Password);
    // if (!this.checkIdIsRegistered(Id)) {
    //   return { statusMessage: 'checkId', loginStatus: false };
    // }
    // console.log(Id,Password);
    // console.log(await this.checkPassword(Id, Password))
    // if (await !this.checkPassword(Id, Password)) {
    //   return { statusMessage: 'checkPassword', loginStatus: false };
    // }
    // console.log(Id,Password);
    if( !(await this.checkIdIsRegistered(Id))&&!(await this.checkPassword(Id,Password))){
      return { statusMessage: 'check', loginStatus: false };
    } else return { statusMessage: 'LoggedIn', loginStatus: true }


    // return { statusMessage: 'LoggedIn', loginStatus: true }
  },



  async getUserInfo(user) {
    const image = await this.getUserImage(user)
    const follower = await this.getFollowerFromUser(user)
    const followerNumber = await this.getFollowerNumberOfUser(user)
    return { image, follower, followerNumber }
  },

  

  async createUser(id, pwd) {
    let userModel = new userSchemaModel();
    userModel.name = id;
    userSchemaModel.userId = this.usersLength();
    userSchemaModel.userFollow = [""];
    userSchemaModel.userURL = `${baseurl}/static/images/profilepicture.png`;
    userSchemaModel.password = pwd
  }

};

module.exports = userStore;
