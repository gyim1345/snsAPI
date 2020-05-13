import postStore from '../repository/postingStore.repository';
import userStore from '../repository/userStore.repository';


const timelineService = {

    async getPostsForTimeline(username) {
        return await postStore.getuserTimeLinePosts(username);
    },

    async getUserRecommendation(username) {
        return await userStore.getRandomUser(username);
    },

    async addFollower(followerName, username) {
        return await userStore.addFollower(followerName, username);
    }

}
module.exports = timelineService