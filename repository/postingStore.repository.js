const userStore = require('./userStore.repository');
import postSchemaModel from '../model/post';

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
    return await postSchemaModel.countDocuments({ userName:user });
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
  
  async changeLike( id, currentUser) {
    let tempPost = {};
    const post = await postSchemaModel.findOne({ id: id })
      if (!post.like.includes(currentUser)) {
        post.like = [...post.like, currentUser];
      } else {
        post.like = post.like.filter( user => user !== currentUser);
      }
      tempPost = post;
      await post.save({});
 
    return tempPost;
  },


  async getuserTimeLinePosts(user) {
    const follower = await userStore.getFollowerFromUser(user);
    const userPosts = await postStore.getuserPosts(user)
   let result = [];
   for( let i = 0; i< follower.length; i++ ) {
     result = [...result, ...(await this.getuserPosts(follower[i]).then())];
   }
   return [...result, ...userPosts];
  },

  async editPostTitle(input, posting) {
      const postModel = await postSchemaModel.findOne({ id: posting.id })
      postModel.title = input;
      await postModel.save();
      return postModel
  
  },
  
  async editUserImageUrl(username, imageUrl) {
    return await postSchemaModel.updateMany({ userName: username }, { $set: {userImageUrl: imageUrl}})
  },

  async createPost(recievedTitle, name, url, tags) {
    const postModel = await new postSchemaModel();
    postModel.id = Date.now();
    postModel.title = recievedTitle;
    postModel.imageUrl = url;
    postModel.userName = name;
    postModel.like = [];
    postModel.tag = tags ? [...tags] : [];
    postModel.userImageUrl = 
      (await userStore.getUserImage(name)) 
      || 'static/images/profilepicture.png';
    await postModel.save();
    return postModel
   },
    
  async removePost(id) {
    await postSchemaModel.deleteOne({ id:Number(id) })
  }
};

module.exports = postStore;
