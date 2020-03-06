const commentStore = require('../repository/commentStore');
const postingStore = require('../repository/postingStore');
import postSchemaModel from '../model/post';
import commentSchemaModel from '../model/comment';

const edit = {
  checkOwnershipOfPost(posting, currentUser) {
    return posting.userName !== currentUser;
  },

  async editPost(input, posting) {
    const post = await postSchemaModel.findOne({ id: posting.id }, (err, postModel) => {
      postModel.title = input;
      postModel.save();
    })
    post.title = input
    return [post];
  },

  async editComment(input, posting, indexOfCommentOnThisPosting) {
    const commentId = posting[indexOfCommentOnThisPosting].id
    const comment = await commentSchemaModel.findOne({ id: commentId });
    comment.title = input;
    await comment.save();
    commentStore.getComment(commentId).title = input
    posting[indexOfCommentOnThisPosting].title = input
    return posting;
  },
  checkIfPostOrComment(indexOfCommentOnThisPosting) {
    return indexOfCommentOnThisPosting === undefined
  },

  async editThis(input, posting, currentUser, indexOfCommentOnThisPosting) {

    if (this.checkOwnershipOfPost(posting[indexOfCommentOnThisPosting] || posting, currentUser)) {
      return { Message: "you don't have permission", owned: false };
    }
    if (this.checkIfPostOrComment(indexOfCommentOnThisPosting)) {
      posting = await this.editPost(input, posting);
      return posting;
    } else {
      posting = await this.editComment(input, posting, indexOfCommentOnThisPosting);
      return posting;
    }
  }
}
module.exports = edit;