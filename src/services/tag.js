const postingStore = require('../repository/postingStore');
const userStore = require('../repository/userStore')

const tag = {
  
    async getTaggedPosts(user) {
        const taggedPosts = await postingStore.getUserTaggedPosts(user);
        console.log(taggedPosts);
        return taggedPosts;
    }

};

module.exports = tag;
