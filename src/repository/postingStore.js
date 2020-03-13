const countStore = require('./countStore');
const userStore = require('./userStore');
import postSchemaModel from '../model/post';


const baseurl = "http://localhost:3000";
const DEFAULT_IMAGE = `${baseurl}/static/images/defaultnumber.png`;
const postStore = {

  async postList() {
    return await postSchemaModel.find()
  },

  async postsLength() {
    return await postSchemaModel.count()
  },

  async postForTag(tag) {
    return await postSchemaModel.find({ tag })
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

  async getuserPosts(name) {
    return await postSchemaModel.find({ userName:name })
  },

  async getUserPostsLength(user) {
    return await postSchemaModel.find({ userName:user })
  },

  async getUserPosts(user) {
    return await postSchemaModel.find({ userName:user })
  },

  async getPost(id) {
    return await postSchemaModel.find({ id:Number(id) })
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
    
    
    
  //   this.posts = [
  //     ...this.posts,
  //     {
  //       id: countStore.usePostingCount(),
  //       title: recievedTitle,
  //       imageUrl: url || DEFAULT_IMAGE,
  //       userName: name,
  //       like: [],
  //       tag: [inputTag || '']
  //     }
  //   ];
  //   return this.posts[this.posts.length - 1];
  // },

  async removePost(id) {
    await postSchemaModel.remove({ id:Number(id) })
  }
};

module.exports = postStore;
