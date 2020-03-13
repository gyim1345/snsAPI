const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')

const scrap = {
  
    async getScrappedPostings(user) {
        const scrapArray = await userStore.getUserScrapIds(user);
        console.log(scrapArray);
        const scrappedPosts = await postingStore.getPostsFromArrayId(scrapArray);
        console.log(scrappedPosts);
        return scrappedPosts
    }

};

module.exports = scrap;
