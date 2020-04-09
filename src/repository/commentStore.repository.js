import commentSchemaModel from '../model/comment';
 
const commentStore = {

  async commentList() {
    return await commentSchemaModel.find();
  },

  async commentsLength() {
    return await commentSchemaModel.countDocuments();
  },

  async getCommentFromPostId(postId) {
      return await commentSchemaModel.find( {postLId: postId})
  },

  async getComment(id) {
    return await commentSchemaModel.findOne( {id: id})
  },

  async editCommentTitle(commentId, input) {
    let comment = await commentSchemaModel.findOne({ id: commentId });
    comment.title = input;
    await comment.save();
    return comment;
  },

  async removeComment(id) {
    await commentSchemaModel.deleteMany({ replyToCommentId: id })
    return await commentSchemaModel.deleteOne( {id: id})
    },
  

  async createComment(id, titlee, commentWrittenBy, index) {
   let commentModel = new commentSchemaModel(); 
   commentModel.id = Date.now();
   commentModel.postLId = id;
   commentModel.title = titlee;
   commentModel.userName = commentWrittenBy;
   commentModel.like = [];
   commentModel.replyToCommentId = index;
   await commentModel.save();
   return commentModel
  },

  async createAndReturnCommentsOfTheSpecificId(id, titlee, commentWrittenBy, index) {
    await this.createComment(id, titlee, commentWrittenBy, index)
    return await this.getCommentFromPostId(id)
  }
  

};

module.exports =  commentStore;
