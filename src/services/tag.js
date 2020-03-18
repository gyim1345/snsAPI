const postingStore = require('../repository/postingStore');

const tag = {
    async getTaggedPosts(username) {
        return await postingStore.getUserTaggedPosts(username);
    }
};

module.exports = tag;
