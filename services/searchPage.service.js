import postStore from '../repository/postingStore.repository';

const searchPageService = {
    async getPicturesForSearchPage() {
        return await postStore.postList()
    },

    async getPostOfSpecificTag(tag) {
        return await postStore.postForTag(tag);
    }
}

module.exports = searchPageService