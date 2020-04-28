import commentStore from '../repository/commentStore.repository';

const commentService = {

    async getCommentForPost(id) {
        return await commentStore.getCommentFromPostId(id)
    },

    async createComment(comment) {
        const { postId, input, username, index } = comment
        return await commentStore.createAndReturnCommentsOfTheSpecificId(postId, input, username, index)
    },

    async checkOwnership(postAuthor, username) {
        return postAuthor !== username;
    },

    async editComment(title, comments, index, commentId) {
        await commentStore.editCommentTitle(title, commentId)
        comments[index].title = title;
        // console.log(comments)
        return comments;
    },

    async editTitleOfComment(title, comments, username, index) {
        const { userName, id } = comments[index]
        const ownership = await this.checkOwnership(userName, username)
        if (ownership) {
            throw false;//incomplete //question throw new error 하면 error: 뭐시기 하던데 이건 어떻게 처리??
        }
        return await this.editComment(title, comments, index, id);
    },

    async removeComment(comments, index) {
        const { id } = comments[index]
        await commentStore.removeComment(id)
        const modifiedComments = comments.filter(comment => comment.id !== id).filter(comment => comment.replyToCommentId !== id);
        return modifiedComments;
    }


}

module.exports = commentService