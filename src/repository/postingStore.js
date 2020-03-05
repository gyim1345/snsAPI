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
      tag: ["boat", "sky", "landscape"]
    },
    {
      id: 2,
      title: "posting with id 2",
      imageUrl: `${baseurl}/static/images/2.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["tree", "sky", "river", "landscape"]
    },
    {
      id: 3,
      title: "posting with id 3",
      imageUrl: `${baseurl}/static/images/3.jpeg`,
      userName: "gibong",
      like: ["gibong", "noone"],
      tag: ["tree", "sky", "crop", "landscape"]
    },
    {
      id: 4,
      title: "posting with id 4",
      imageUrl: `${baseurl}/static/images/4.png`,
      userName: "gibong",
      like: ["guy", "noone"],
      tag: ["tree", "sky", "mountain", "landscape"]
    },
    {
      id: 5,
      title: "posting with id 5",
      imageUrl: `${baseurl}/static/images/ubuntu.jpg`,
      userName: "guy",
      like: ["noone"],
      tag: []
    },
    {
      id: 6,
      title: "posting with id 6",
      imageUrl: `${baseurl}/static/images/ubuntu2.jpg`,
      userName: "guy",
      like: [],
      tag: []
    },
    {
      id: 7,
      title: "posting with id 7",
      imageUrl: `${baseurl}/static/images/wallpaperflare.jpg`,
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
    },
    {
      id: 10,
      title: "Amazing night sky with stars",
      imageUrl: `${baseurl}/static/images/5.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["star", "sky", "landscape"]
    },
    {
      id: 11,
      title: "Beautiful sky at dawn",
      imageUrl: `${baseurl}/static/images/6.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["sky", "landscape"]
    },
    {
      id: 12,
      title: "Picture of campus",
      imageUrl: `${baseurl}/static/images/7.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["campus", "sky"]
    },
    {
      id: 13,
      title: "Offroad biking",
      imageUrl: `${baseurl}/static/images/8.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["offroad", "sky", "mountain", "landscape"]
    },
    {
      id: 14,
      title: "Building on top of a cliff at dawn",
      imageUrl: `${baseurl}/static/images/9.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["cliff", "sky", "mountain", "landscape", "dawn"]
    },
    {
      id: 15,
      title: "Tornado",
      imageUrl: `${baseurl}/static/images/10.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["tornado", "sky", "landscape"]
    },
    {
      id: 16,
      title: "Desert",
      imageUrl: `${baseurl}/static/images/11.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["desert", "landscape"]
    },
    {
      id: 17,
      title: "Shining Tree",
      imageUrl: `${baseurl}/static/images/12.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["tree", "landscape"]
    },
    {
      id: 18,
      title: "Ruin",
      imageUrl: `${baseurl}/static/images/13.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["ruin"]
    },
    {
      id: 19,
      title: "Nice picture",
      imageUrl: `${baseurl}/static/images/14.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["river", "sky", "mountain", "landscape"]
    },
    {
      id: 20,
      title: "Mountain",
      imageUrl: `${baseurl}/static/images/15.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["sky", "mountain", "landscape"]
    },
    {
      id: 21,
      title: "Red sky on the beach",
      imageUrl: `${baseurl}/static/images/16.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"],
      tag: ["red", "sky", "landscape"]
    },
  ],

  get postList() {
    return this.posts;
  },

  get postsLength() {
    return this.posts.length;
  },

  postForTag(tag) {
    return this.posts.filter(post => post.tag.includes(tag))
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


  createPost(recievedTitle, name, url, inputTag) {
    this.posts = [
      ...this.posts,
      {
        id: countStore.usePostingCount(),
        title: recievedTitle,
        imageUrl: url || DEFAULT_IMAGE,
        userName: name,
        like: [],
        tag: [inputTag || '']
      }
    ];
    return this.posts[this.posts.length - 1];
  },

  removePost(id) {
    this.posts = this.posts.filter(el => el.id !== Number(id));
  }
};

module.exports = postStore;
