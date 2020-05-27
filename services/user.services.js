import userStore from '../repository/userStore.repository'
import postStore from '../repository/postingStore.repository'

const userService = {

    async getUserInfoForUserPage(user) {
        let postCount = await postStore.getUserPostsLength(user);
        const { userURL, followerNumber, nickName, introductory, name } = await userStore.getUserInfo(user);
        const userInfo = await { userURL, name, postCount, followerNumber, nickName, introductory };
        return userInfo
    },

    async getUserProfileImage(user) {
        return await userStore.getUserImage(user);
    },

    async editUserNickName(username, input) {
        return await userStore.editUserNickName(username, input);
    },

    async editUserIntroductory(username, input) {
        return await userStore.editUserIntroductory(username, input);
    },

    async editUserProfileImage(username, imageUrl) {
        await postStore.editUserImageUrl( username, imageUrl );
        return await userStore.editUserImage( username, imageUrl );
    },

}

module.exports = userService;

