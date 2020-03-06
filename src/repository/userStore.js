const baseurl = "http://localhost:3000";
import userSchemaModel from '../model/user';

const userStore = {

  async userList() {
    return await userSchemaModel.find();
  },

  async usersLength() {
    return await userSchemaModel.find().length;
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

  async getFollowerNumberOfUser(userName) {
    const [ userInfo ]  = await userSchemaModel.find({ name: userName })
    return userInfo.userFollow.length -1;
  },

  async getUserPassword(userName) {
    return await userSchemaModel.find({ name: userName }).password;
  },

  async addFollower(userName, targetUserName) {
    return await userSchemaModel.find({ name: userName }, (err, userModel) => {
      userModel.userFollower.push(targetUserName);
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

  //  async createUser(id, pwd) {
  //     this.users = [
  //       ...this.users,
  //       {
  //         name: id,
  //         userId: this.usersLength,
  //         userFollow: [""],
  //         userURL: `${baseurl}/static/images/profilepicture.png`,
  //         password: pwd
  //       }
  //     ];
  //   }

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
