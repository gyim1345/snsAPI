const baseurl = "http://localhost:3000";
import userSchemaModel from '../model/user';

const userStore = {

  async userList() {
    return await userSchemaModel.find();
  },

  async getFollowerFromUser(userName) {
    if (userName !== undefined) {
      const [ userInfo ]  = await userSchemaModel.find({ name: userName })
      // console.log(userInfo.userFollow)
      return userInfo.userFollow;
    }
    return "empty";
  },

async getRandomUser(userName) {
  const users = await userSchemaModel.find()
  const [ currentUserInfo ] = users.filter(it => it.name === userName);
  const randomUser = users.filter(it => !currentUserInfo.userFollow.includes(it.name) && it.name !== userName)
  return randomUser
},  

async getUserImage(userName) {
  const [userInfo] = await userSchemaModel.find({ name: userName });
  return userInfo.userURL;
},

async getUserScrappedPostIds(username) {
  return (await userSchemaModel.findOne({ name: username})).scrap
},

  // async getFollowerNumberOfUser(userName) {
  //   const [ userInfo ]  = await userSchemaModel.find({ name: userName })
  //   return userInfo.userFollow.length -1;
  // },

  // async getUserPassword(userName) {
  //   return await userSchemaModel.find({ name: userName }).password;
  // },
  async checkIdIsRegistered(userName) {
    return (await userSchemaModel.findOne({ name: userName })) === null
  },

  async checkPassword(Id, Password) {
    // console.log((await userSchemaModel.findOne({ name: Id})).password, Password)
    console.log('asdasd', Id, Password);
    console.log( await userSchemaModel.findOne({ name: Id}));
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



  async addPostIdToScrap(scrapId, userName) {
    const userInfo = await userSchemaModel.findOne({ name: userName })
    if(!userInfo.scrap.includes(scrapId)){
      userInfo.scrap.push(scrapId);
      await userInfo.save();
      return {message: "scrapped"}
      }
      else {
      return {message: "already scrapped"}
      }
  },

  async getUserScrapIds(userName) {
    const userInfo = await userSchemaModel.findOne({ name: userName });
    return userInfo.scrap;
  },

 
  async getUserInfo(userName) {

    const userInfo = await userSchemaModel.findOne({ name: userName });
    const userURL = await userInfo.userURL;
    const followerNumber = (await userInfo.userFollow).length;
    const nickName = await userInfo.nickName;
    const introductory = await userInfo.introductory;
    const name = await userInfo.name
    return { userURL, followerNumber, nickName, introductory, name }
  },

  async editUserNickName(userName, nickName) {
    let userInfo = await userSchemaModel.findOne({ name: userName });
    userInfo.nickName = nickName
    await userInfo.save();
    return nickName;
  },

  async editUserIntroductory(userName, Introductory) {
    let userInfo = await userSchemaModel.findOne({ name: userName });
    userInfo.introductory = Introductory
    await userInfo.save();
    return Introductory;
  },

  async editUserImage(username,imageUrl) {
    let userInfo = await userSchemaModel.findOne({ name: username });
    userInfo.userURL = imageUrl;
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
    return true;
  }

};

module.exports = userStore;
