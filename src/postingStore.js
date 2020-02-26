const countStore = require('./countStore');
const userStore = require('./userStore');

const baseurl = "http://localhost:3000";
const DEFAULT_IMAGE = `${baseurl}/static/images/defaultnumber.png`;
const postStore = {
  posts: [
    {
      id: 1,
      title: "posting with id 1",
      imageUrl: `${baseurl}/static/images/1.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["boat", "sky"]
    },
    {
      id: 2,
      title: "posting with id 2",
      imageUrl: `${baseurl}/static/images/2.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["tree", "sky", "river"]
    },
    {
      id: 3,
      title: "posting with id 3",
      imageUrl: `${baseurl}/static/images/3.jpeg`,
      userName: "gibong",
      like: ["gibong", "noone"],
      tag: ["tree", "sky", "crop"]
    },
    {
      id: 4,
      title: "posting with id 4",
      imageUrl: `${baseurl}/static/images/4.png`,
      userName: "gibong",
      like: ["guy", "noone"],
      tag: ["tree", "sky", "mountain"]
    },
    {
      id: 5,
      title: "posting with id 5",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: ["noone"],
      tag: []
    },
    {
      id: 6,
      title: "posting with id 6",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: [],
      tag: []
    },
    {
      id: 7,
      title: "posting with id 7",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: ["guy", "noone"],
      tag: []
    },
    {
      id: 8,
      title: "posting with id 8",
      imageUrl: DEFAULT_IMAGE,
      userName: "noone",
      like: ["gibong", "guy"],
      tag: []
    },
    {
      id: 9,
      title: "posting with id 9",
      imageUrl: DEFAULT_IMAGE,
      userName: "noone",
      like: ["noone"],
      tag: []
    }
  ],

  get postList() {
    return this.posts;
  },

  get postsLength() {
    return this.posts.length;
  },

  changeLike({ id }, currentUser, postingAll) {
    let post = this.getPost(id);
    if (!post.like.includes(currentUser)) {
      post.like = [...post.like, currentUser];
    } else {
      post.like = post.like.filter( user => user !== currentUser);
    }

    const index = postingAll.findIndex(it => id === it.id)
    postingAll[index] = post;
    return postingAll;
  },


  getuserTimeLinePosts(user) {
    let postings = this.getuserPosts(user);
    const follower = userStore.getFollowerFromUser(user);
    follower.forEach(person => postings = [...postings, ...this.getuserPosts(person)])
    return postings;
  },

  getuserPosts(name) {
    return this.posts.filter(post => post.userName === name);
  },

  getUserPosts(user) {
    return this.posts.filter(post => post.userName === user)
  },

  getPost(id) {
    return this.posts.find(post => post.id === Number(id));
  },


  createPost(recievedTitle, name) {
    this.posts = [
      ...this.posts,
      {
        id: countStore.usePostingCount(),
        title: recievedTitle,
        imageUrl: DEFAULT_IMAGE,
        userName: name,
        like: [],
        tag: []
      }
    ];
    return this.posts[this.posts.length - 1];
  },

  removePost(id) {
    this.posts = this.posts.filter(el => el.id !== Number(id));
  }
};

module.exports = postStore;
