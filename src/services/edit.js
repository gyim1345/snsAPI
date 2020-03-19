const commentStore = require('../repository/commentStore');
const postingStore = require('../repository/postingStore');

const edit = {
  checkOwnershipOfPost(posting, currentUser) {
    return posting.userName !== currentUser;
  },

  async editPost(input, posting) {
    let post = await postingStore.editPostTitle(input,posting)
    post.title = input
    console.log(post)
    return [post];
  },

  async editComment(input, posting, indexOfCommentOnThisPosting) {
    const commentId = posting[indexOfCommentOnThisPosting].id
    await commentStore.editCommentTitle(commentId,input)
    posting[indexOfCommentOnThisPosting].title = input
    return posting;
  },

  
  checkIfPostOrComment(indexOfCommentOnThisPosting) {
    return indexOfCommentOnThisPosting === undefined
  },

  async editThis(input, posting, currentUser, indexOfCommentOnThisPosting) {
    
    if (await this.checkOwnershipOfPost(posting[indexOfCommentOnThisPosting] || posting, currentUser)) {
      return { Message: "you don't have permission", owned: false };
    }
    if (await this.checkIfPostOrComment(indexOfCommentOnThisPosting)) {
      posting = await this.editPost(input, posting);
      return posting;
    } else {
      posting = await this.editComment(input, posting, indexOfCommentOnThisPosting);
      return posting;
    }
  }
}
module.exports = edit;