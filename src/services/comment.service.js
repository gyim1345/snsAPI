import commentStore from '../repository/commentStore.repository';

const commentService ={

    async getCommentForPost(id) {
        return await commentStore.getCommentFromPostId(id)
    },

    async createComment(comment) {
        const { postId, input, username, index } = comment
        return await commentStore.createAndReturnCommentsOfTheSpecificId(postId, input, username, index)
    },
    
    async removeComment({comments, id}) {
      await commentStore.removeComment(id)
      const modifiedComments = comments.filter(comment => comment.id !== id && comment.replyToCommentId !== id);
      return modifiedComments;  
    }


}

module.exports = commentService