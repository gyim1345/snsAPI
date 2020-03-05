const countStore = {
  count: {
    postingCount: 21,
    commentCount: 21
  },

  get postCount() {
    return this.count.postingCount;
  },

  get commentCount() {
    return this.count.commentCount;
  },

  useCommentCount() {
    this.count.commentCount += 1;
    return this.count.commentCount;
  },

  usePostingCount() {
    this.count.postingCount += 1;
    return this.count.postingCount;
  }
};



module.exports =  countStore;
