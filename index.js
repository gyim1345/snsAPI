const express = require('express');
const cors = require('cors');

const postStore = require('./postingStore');
const commentStore = require('./commentStore');
const userStore = require('./userStore');
const countStore = require('./countStore');
const edit = require('./edit');
// const login = require('./login')

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
  // console.log(title,user)
  const posts = postStore.createPost(title, user);
  // console.log('asd', posts)
  res.send( posts );
});


app.post('/comments/:id', (req, res) => {
  const { id } = req.body;
  const comments = commentStore.getCommentFromPostId(id)
  res.send( comments );
})

app.post('/login', (req, res) => {
  const { Id, Password } = req.body;
  console.log(Id, Password);
  const loginMessageAndStatus = userStore.performLogin(Id, Password)
  console.log(loginMessageAndStatus)
  res.send( loginMessageAndStatus );
})


app.patch('/postsedit', (req, res) => {
  const { input, posting, user, indexOfCommentOnThisPosting } = req.body;
  console.log(input, posting, user, 'qweqwe',indexOfCommentOnThisPosting,'qweqd')
  // console.log(title,user)
  const posts = edit.editThis(input, posting, user, indexOfCommentOnThisPosting);
  console.log('asd', posts)
  res.send( posts );
});
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


