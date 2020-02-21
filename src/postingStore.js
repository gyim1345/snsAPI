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
      like: ["gibong", "guy", "noone"]
    },
    {
      id: 2,
      title: "posting with id 2",
      imageUrl: `${baseurl}/static/images/2.jpg`,
      userName: "gibong",
      like: ["gibong", "guy", "noone"]
    },
    {
      id: 3,
      title: "posting with id 3",
      imageUrl: `${baseurl}/static/images/3.jpeg`,
      userName: "gibong",
      like: ["gibong", "noone"]
    },
    {
      id: 4,
      title: "posting with id 4",
      imageUrl: `${baseurl}/static/images/4.png`,
      userName: "gibong",
      like: ["guy", "noone"]
    },
    {
      id: 5,
      title: "posting with id 5",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: ["noone"]
    },
    {
      id: 6,
      title: "posting with id 6",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: []
    },
    {
      id: 7,
      title: "posting with id 7",
      imageUrl: DEFAULT_IMAGE,
      userName: "guy",
      like: ["guy", "noone"]
    },
    {
      id: 8,
      title: "posting with id 8",
      imageUrl: DEFAULT_IMAGE,
      userName: "noone",
      like: ["gibong", "guy"]
    },
    {
      id: 9,
      title: "posting with id 9",
      imageUrl: DEFAULT_IMAGE,
      userName: "noone",
      like: ["noone"]
    }
  ],

  get postList() {
    return this.posts;
  },

  get postsLength() {
    return this.posts.length;
  },

  changeLike(posting,currentUser, postingAll) {
    console.log(!this.getPost(posting.id).like.includes(currentUser))
    console.log(posting,currentUser, postingAll)
//index 를 구해서 넣어야함
// 그러면 postingAll에서의 인덱스를 posting 이랑 비교해서 찾아야함.
    const index = postingAll.findIndex( e=> JSON.stringify(e) === JSON.stringify(posting))
    if(!this.getPost(posting.id).like.includes(currentUser)){
      postingAll[index].like=[...this.getPost(posting.id).like, currentUser]
      this.getPost(posting.id).like=[...this.getPost(posting.id).like, currentUser];
      return postingAll
    }

    postingAll[index].like = this.getPost(posting.id).like.filter(x => x !== currentUser)
    this.getPost(posting.id).like = this.getPost(posting.id).like.filter(x => x !== currentUser)
    return postingAll
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
        title:  recievedTitle,
        imageUrl: DEFAULT_IMAGE,
        userName: name,
        like: []
      }
    ];
    return this.posts[this.posts.length-1];
  },

  removePost(id) {
    this.posts = this.posts.filter(el => el.id !== Number(id));
  }
};

module.exports = postStore;
