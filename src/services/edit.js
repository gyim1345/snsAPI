const commentStore = require('../repository/commentStore');
const postingStore = require('../repository/postingStore');


const edit = {
  checkOwnershipOfPost(posting, currentUser) {
    return posting.userName !== currentUser;
  },
  editPost(input, posting) {
    postingStore.getPost(posting.id).title = input;
    return postingStore.getPost(posting.id);
  },

  editComment(input, posting, indexOfCommentOnThisPosting) {
    const commentId = posting[indexOfCommentOnThisPosting].id
    commentStore.getComment(commentId).title = input
    posting[indexOfCommentOnThisPosting].title = input
    return posting;
  },
  checkIfPostOrComment(indexOfCommentOnThisPosting) {
    return indexOfCommentOnThisPosting === undefined
  },

  editThis(input, posting, currentUser, indexOfCommentOnThisPosting) {
    if (this.checkOwnershipOfPost(posting[indexOfCommentOnThisPosting] || posting, currentUser)) {
      return { Message: "you don't have permission", owned: false };
    }
    if (this.checkIfPostOrComment(indexOfCommentOnThisPosting)) {
      posting = this.editPost(input, posting);
      return posting;
    } else {
      posting = this.editComment(input, posting, indexOfCommentOnThisPosting);
      return posting;
    }
  }
}
module.exports = edit;