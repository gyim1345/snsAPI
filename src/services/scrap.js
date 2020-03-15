const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')

const scrap = {
  
    async getScrappedPostings(user) {
        const scrapArray = await userStore.getUserScrapIds(user);
        const scrappedPosts = await postingStore.getPostsFromArrayId(scrapArray);
        return scrappedPosts
    }

};

module.exports = scrap;
