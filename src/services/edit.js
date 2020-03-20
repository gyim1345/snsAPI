const commentStore = require('../repository/commentStore');
const postingStore = require('../repository/postingStore');

const edit = {
  checkOwnershipOfPost(posting, username) {
    return posting.userName !== username;
  },

  async editPost(title, post) {
    let editedPost = await postingStore.editPostTitle(title,post)
    editedPost.title = title
    return [editedPost];
  },

  async editComment(title, posts, indexOfComment) {
    const commentId = posts[indexOfComment].id
    await commentStore.editCommentTitle(commentId,title)
    posts[indexOfComment].title = title
    return posts;
  },

  
  checkIfPostOrComment(indexOfComment) {
    return indexOfComment === undefined
  },

  async editThis(title, post, userName, indexOfComment) {
    
    if (await this.checkOwnershipOfPost(post[indexOfComment] || post, userName)) {
      return { Message: "you don't have permission", owned: false };
    }
    if (await this.checkIfPostOrComment(indexOfComment)) {
      post = await this.editPost(title, post);
      return post;
    } else {
      post = await this.editComment(title, post, indexOfComment);
      return post;
    }
  }
}
module.exports = edit;