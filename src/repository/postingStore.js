const userStore = require('./userStore');
import postSchemaModel from '../model/post';


const baseurl = "http://localhost:3000";
const DEFAULT_IMAGE = `${baseurl}/static/images/defaultnumber.png`;
const postStore = {

  async postList() {
    return await postSchemaModel.find()
  },

  async postsLength() {
    return await postSchemaModel.countDocuments()
  },

  async postForTag(tag) {
    return await postSchemaModel.find({ tag })
  },
  
  async getuserPosts(name) {
    return await postSchemaModel.find({ userName:name });
  },
  
  async getUserPostsLength(user) {
    return (await postSchemaModel.findOne({ userName:user })).length;
  },
  
  async getUserPosts(user) {
    return await postSchemaModel.find({ userName:user });
  },
  
  async getPost(id) {
    return await postSchemaModel.find({ id:Number(id) });
  },
  
  async getPostsFromArrayId(array) {
    return await postSchemaModel.find({ id: { $in: array }});
  },
  
  async getUserTaggedPosts( user ) { 
    return await postSchemaModel.find({ tag: user });
  },
  
  async changeLike({ id }, currentUser) {
    let tempPost = {};
    const post = await postSchemaModel.findOne({ id: id }, (err, postModel) => { 
      
      if (!postModel.like.includes(currentUser)) {
        postModel.like = [...postModel.like, currentUser];
      } else {
        postModel.like = postModel.like.filter( user => user !== currentUser);
      }
      tempPost = postModel;
      postModel.save({});
  })

    return tempPost;
  },


  async getuserTimeLinePosts(user) {
    const follower = await userStore.getFollowerFromUser(user);
   let result = [];
   for( let i = 0; i< follower.length; i++ ) {
     result = [...result , ...(await this.getuserPosts(follower[i]).then())];
   }

    return result;
  },

  async editPostTitle(input, posting) {
    return await postSchemaModel.findOne({ id: posting.id }, (err, postModel) => {
      postModel.title = input;
      postModel.save();
    })
  },

  async createPost(recievedTitle, name, url, inputTag) {
    const postModel = new postSchemaModel();
    postModel.id = Date.now();
    postModel.title = recievedTitle;
    postModel.imageUrl = url;
    postModel.userName = name;
    postModel.like = [];
    postModel.tag = [inputTag];
    await postModel.save();
    console.log(postModel);
    return postModel
   },
    
  async removePost(id) {
    await postSchemaModel.remove({ id:Number(id) })
  }
};

module.exports = postStore;
