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

  async changeLike({ id }, currentUser, postingAll) {
    const post = await postSchemaModel.findOne({ id: id }, (err, postModel) => { 
      
      if (!postModel.like.includes(currentUser)) {
        postModel.like = [...postModel.like, currentUser];
      } else {
        postModel.like = postModel.like.filter( user => user !== currentUser);
      }
      // tempPost = postModel;
      postModel.save({});
  })
    const index = postingAll.findIndex(it => id === it.id)
    postingAll[index] = post;
    return postingAll;
  },


  async getuserTimeLinePosts(user) {
    let postings = await this.getuserPosts(user);
    const follower = await userStore.getFollowerFromUser(user);

    // follower.forEach(person => postings = [...postings, ...await this.getuserPosts(person)])
    return postings;
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


  createPost(recievedTitle, name, url, inputTag) {
    this.posts = [
      ...this.posts,
      {
        id: countStore.usePostingCount(),
        title: recievedTitle,
        imageUrl: url || DEFAULT_IMAGE,
        userName: name,
        like: [],
        tag: [inputTag || '']
      }
    ];
    return this.posts[this.posts.length - 1];
  },

  async removePost(id) {
    await postSchemaModel.remove({ id:Number(id) })
  }
};

module.exports = postStore;
