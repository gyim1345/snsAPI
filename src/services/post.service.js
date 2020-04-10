import postStore from '../repository/postingStore.repository';
import userStore from '../repository/userStore.repository';

const postService = {

    async getAllPosts() {
        return await postStore.postList();
    },

    async getPostById(id) {
        return await postStore.getPost(id)
    },

    async createPost(title, username) {
        return await postStore.createPost(title, username)
    },

    async checkOwnershipOfPost(postAuthor, username) {
        return postAuthor !== username;
    },//incomplete

    async editPost(title, post) {
        let editedPost = await postStore.editPostTitle(title, post)
        editedPost.title = title
        return [editedPost];
    },

    async editTitleOfPost(title, post, username) {
        const { userName } = post
        const ownership = await this.checkOwnershipOfPost(userName, username)
        if (ownership) {
            throw false;//incomplete //question throw new error 하면 error: 뭐시기 하던데 이건 어떻게 처리??
        }
        post = await this.editPost(title, post);
        return post;
    },
    //   return  await edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);

    async removePost(username, id, sessionUserName) {
        const ownership = await this.checkOwnershipOfPost(username, sessionUserName)
        if (ownership) {
            throw false;//incomplete //question throw new error 하면 error: 뭐시기 하던데 이건 어떻게 처리??
        }
        await postStore.removePost(id);
        return true;
    },

    async changeLike({ id }, currentUserName) {
        return await postStore.changeLike(id, currentUserName)
    },

    async getTaggedPosts(username) {
        return await postStore.getUserTaggedPosts(username);
    },
    
    async getPostIsScrapped(id, username) {
        const scrapIds = await userStore.getUserScrappedPostIds(username);
        return scrapIds.includes(id)
    },

    async getScrappedPosts(user) {
        const scrapArray = await userStore.getUserScrapIds(user);
        const scrappedPosts = await postStore.getPostsFromArrayId(scrapArray);
        return scrappedPosts
    },

    async uploadPost(input, user, url, inputTag) {
        return await postStore.createPost(input, user, url, inputTag)
    },

    async scrapPost(id, username) {
        return userStore.addPostIdToScrap(id, username)
    }

}





module.exports = postService