const countStore = require('./countStore');
import commentSchemaModel from '../model/comment';
 
const commentStore = {

  async commentList() {
    return await commentSchemaModel.find();
  },

  async commentsLength() {
    return (await commentSchemaModel.find()).length;
  },

  async getCommentFromPostId(postId) {
      return await commentSchemaModel.find( {postLId: postId})
  },

  async getComment(id) {
    return await commentSchemaModel.findOne( {id: id})
  },

  async removeComment(theComment) {
    await commentSchemaModel.remove({ isUnder: theComment.id })
    return await commentSchemaModel.remove( {id: theComment.id})
    },

  async createComment(id, titlee, commentWrittenBy, commentId) {
   let commentModel = new commentSchemaModel(); 
   commentModel.id = Date.now();
   commentModel.postLId = id;
   commentModel.title = titlee;
   commentModel.userName = commentWrittenBy;
   commentModel.like = [];
   commentModel.isUnder = commentId;
   commentModel.save();
  }


};

module.exports =  commentStore;
