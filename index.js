const express = require('express');
const cors = require('cors');

const postStore = require('./postingStore');
const commentStore = require('./commentStore');
const userStore = require('./userStore');
const countStore = require('./countStore');
const edit = require('./edit');
const remove = require('./remove');
const register = require('./register');

const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/static/images', express.static('static/images'));
// 처음은 브라우저에서의 입력값. static은 내 서버api에 있는 디렉토리
app.get('/posts', (req, res) => {
  const posts = postStore.postList;
  res.send( posts );
});

app.get('/posts/:id', (req, res) => {
  const posts = postStore.getPost(req.params.id)
  // console.log(posts)
  res.send({ posts });
});

app.post('/TimeLine', (req, res) => {
  const { user } = req.body;
 // const posts = getuserTimeLinePosts(user)
  const posts = postStore.getuserTimeLinePosts(user);
  res.send({ posts });
});
// 여기서 /posts/TimeLine 하면 안됨..... 왜 안되는지는 모르겠다.

app.post('/user', (req, res) => {
  const { user } = req.body;
  const posts = postStore.getuserPosts(user);
  res.send({ posts });
})


app.patch('/posts', (req, res) => {
  const { title, user } = req.body;
  const posts = postStore.createPost(title, user);
  res.send( posts );
});


app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comments = commentStore.getCommentFromPostId(id)
  res.send( comments );
})

app.post('/comments/:id', (req, res) => {
  const { postId, inputa, currentUser } = req.body;
  console.log(postId, inputa, currentUser)
  commentStore.createComment(postId, inputa, currentUser)
  comments = commentStore.getCommentFromPostId(postId)
  res.send( comments );
})

app.post('/login', (req, res) => {
  const { Id, Password } = req.body;
  const loginMessageAndStatus = userStore.performLogin(Id, Password)
  res.send( loginMessageAndStatus );
})

app.post('/register', (req, res) => {
  const { id, password } = req.body;
  const registration = register.Registration  (id, password)
  res.send( registration );
})


app.patch('/postsedit', (req, res) => {
  const { input, posting, user, indexOfCommentOnThisPosting } = req.body;
  console.log('rrr',  input, posting)
  const posts = edit.editThis(input, posting, user, indexOfCommentOnThisPosting);
  res.send( posts );
});


app.patch('/postsRemove', (req, res) => {
  const { posting, user, indexOfCommentOnThisPosting } = req.body;
  const posts = remove.removeThis(posting, user, indexOfCommentOnThisPosting);
  res.send( posts );
});

app.post('/userInfo', (req,res) => {
  const user = req.body.user;
  const postNumber = postStore.getUserPosts(user).length
  const {image, follower, followerNumber} = userStore.getUserInfo(user)
  const post = { image, user, postNumber, followerNumber}
  res.send( post )  
})

// app.delete('/posts/:id', (req, res) => {
//   console.log(req.params)
//   console.log(req.body)
//   const { id } = req.params;  
//   // console.log(id);
//   const posts = remove.removeThis(id);
//   console.log('ㅁㄴㅇㅁㅁㅁ', posts)
//   res.send( posts );
// });

// app.patch('/posts/:id', (req, res) => {
//   const id = req.params.id;
//   const posts = togglePost(id);
//   res.send({ posts });
// });

// app.delete('/posts/:id', (req, res) => {
//   const id = req.params.id;
//   const posts = removePost(id);
//   res.send({ posts });
// });

app.listen(3000, () => {
  console.log(`Listening on port ${port}...`);
});


