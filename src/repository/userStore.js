const baseurl = "http://localhost:3000";
import userSchemaModel from '../model/user';

const userStore = {

  async userList() {
    return await userSchemaModel.find();
  },

  // async getUserImage(user) {
  //   return (await userSchemaModel.findOne({name:user})).userURL
  // },

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

async getUserImage(userName) {
  const [userInfo] = await userSchemaModel.find({ name: userName });
  return userInfo.userURL;
},

  // async getFollowerNumberOfUser(userName) {
  //   const [ userInfo ]  = await userSchemaModel.find({ name: userName })
  //   return userInfo.userFollow.length -1;
  // },

  // async getUserPassword(userName) {
  //   return await userSchemaModel.find({ name: userName }).password;
  // },
  async checkIdIsRegistered(Id) {
    return (await userSchemaModel.findOne({ name: Id })) === null
  },

  async checkPassword(Id, Password) {
    // console.log((await userSchemaModel.findOne({ name: Id})).password, Password)
    return  (await userSchemaModel.findOne({ name: Id})).password === Password;
  },

  async addFollower(follower, currentUser) {
    const userInfo = await userSchemaModel.findOne({ name: currentUser })
    userInfo.userFollow.push(follower);
    await userInfo.save();
    return userInfo;

    // return await userSchemaModel.findOne({ name: currentUser }, (err, userModel) => {
    //   console.log(follower);
    //   userModel.userFollow.push(follower);
    //   console.log(userModel);
    //   userModel.save();

    //   return userModel;
    // })
  },



  async addPostIdToScrap(Id, currentUser) {
    const userInfo = await userSchemaModel.findOne({ name: currentUser })
    if(!userInfo.scrap.includes(Id)){
      userInfo.scrap.push(Id);
      await userInfo.save();
      return {message: "scrapped"}
      }
      else {
      return {message: "already scrapped"}
      }
  },

  async getUserScrapIds(user) {
    const userInfo = await userSchemaModel.findOne({ name: user });
    return userInfo.scrap;
  },

 
  async getUserInfo(user) {
    const userInfo = await userSchemaModel.findOne({ name: user });
    const image = await userInfo.userURL;
    const follower = await userInfo.userFollow;
    const followerNumber = await follower.length;
    const userNickName = await userInfo.nickName;
    const userIntroductory = await userInfo.introductory;
    return { image, follower, followerNumber, userNickName, userIntroductory }
  },

  async editUserNickName(user,input) {
    let userInfo = await userSchemaModel.findOne({ name: user });
    userInfo.nickName = input
    await userInfo.save();
    return input;
  },

  async editUserIntroductory(user, input) {
    let userInfo = await userSchemaModel.findOne({ name: user });
    userInfo.introductory = input
    await userInfo.save();
    return input;
  },

  async editUserImage(user,imageUrl) {
    let userInfo = await userSchemaModel.findOne({ name: user.user });
    userInfo.userURL = user.imageUrl;
    await userInfo.save();
    return userInfo;
  },

  async createUser(id, pwd) {
    let userModel = new userSchemaModel();
    userModel.name = id;
    userModel.userId = `user${Date.now()}`;
    userModel.userFollow = ["Bongstagram"];
    userModel.userURL = `${baseurl}/static/images/profilepicture.png`;
    userModel.password = pwd;
    userModel.scrap = [];
    userModel.nickName = '';
    userModel.introductory = '';
    await userModel.save();
    return userModel;
  }

};

module.exports = userStore;
