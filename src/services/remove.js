const commentStore = require('../repository/commentStore');
const postingStore = require('../repository/postingStore');

const remove = {

  checkIsPost(indexOfComment) {
    if (!indexOfComment) {
      return true
    }
    else return false;
  },

  async checkOwnerShipOfPost(post, userName, indexOfComment) {
    return await this.checkIsPost(indexOfComment)
      ? userName === post.userName
      : userName === post[indexOfComment].userName
  },

  async removeThis(post, userName, indexOfComment) {
    if (await this.checkOwnerShipOfPost(post, userName, indexOfComment) !== true)
      return { Message: "You don't have permission" }

    if (indexOfComment === undefined) {
      postingStore.removePost(post.id);
      return true;
    }

    // if (indexOfComment !== undefined) {
      const theComment = post[indexOfComment];
      commentStore.removeComment(theComment);
      return post.filter(comment => comment.id !== theComment.id && comment.isUnder !== theComment.id);
    // }
  }
}


module.exports = remove;
