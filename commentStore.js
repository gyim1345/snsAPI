const countStore = require('./countStore');

const commentStore = {
  comments: [
    {
      id: 1,
      postLId: 1,
      title: "comment with postLId 1",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 2,
      postLId: 2,
      title: "comment with postLId 2",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 3,
      postLId: 3,
      title: "comment with postLId 3 A",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 4,
      postLId: 3,
      title: "comment with postLId 3 B",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 5,
      postLId: 3,
      title: "comment with postLId 3 C",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 6,
      postLId: 3,
      title: "comment with postLId 3 D",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 7,
      postLId: 3,
      title: "comment with postLId 3 E",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 8,
      postLId: 3,
      title: "comment with postLId 3 F",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    { id: 9,
      postLId: 4,
      title: "comment with postLId 4",
      userName: "guy",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 10,
      postLId: 5,
      title: "comment with postLId 5",
      userName: "noone",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 11,
      postLId: 1,
      title: "comment with postLId 1",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: undefined
    },
    {
      id: 12,
      postLId: 1,
      title: "under comment",
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      isUnder: 1
    },
  ],

  get commentList() {
    return this.comments;
  },

  get commentsLength() {
    return this.comments.length;
  },

  getCommentFromPostId(postId) {
      return this.comments.filter(comment => comment.postLId === Number(postId));
  },

  getComment(id) {
    return this.comments.find(comment => comment.id === id);
  },

  getReplyFromComment(comment) {
    return this.comments.find(x => x === comment).reply;
  },

  // removeComment(postingId, commentId) {
  // const removeElement = this.comments.find(
  //     comment => comment.id === commentId && comment.postLId === postingId
  //     );
  //   this.comments = this.comments.filter(comment => comment !== removeElement);
  // },

  removeComment(theComment) {
    return this.comments = this.comments.filter(comment =>comment.id !== theComment.id)
    },

  createComment(id, titlee, commentWrittenBy, commentId) {
    this.comments = [
      ...this.comments,
      {
        id: countStore.useCommentCount(),
        postLId: id,
        title: titlee,
        userName: commentWrittenBy,
        like: [],
        isUnder : commentId
      }
    ];
  }
};

module.exports =  commentStore;
