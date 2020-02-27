// import v1Route from './routes';
import v1Route from './routes'
import express from 'express';
import cors from 'cors';
var path = require('path');


const postStore = require('./postingStore');
const commentStore = require('./commentStore');
const userStore = require('./userStore');
const countStore = require('./countStore');
const edit = require('./edit');
const remove = require('./remove');
// const register = require('./register');
const Like = require('./Like');
const statusStore = require('./statusStore')
const fileUpload = require('express-fileupload');

require('dotenv').config();



const port = 3000;



const app = express();
app.use(express.json());
app.use(cors());
app.use(v1Route);
app.use(fileUpload());

console.log('asfa')



// app.use('/v1', v1Route)
app.use('/static/images', express.static('static/images'));
// 처음은 브라우저에서의 입력값. static은 내 서버api에 있는 디렉토리
// app.get('/posts', (req, res) => {
//   const posts = postStore.postList;
//   res.send( posts );
// });
app.post('/upload', (req, res) => {
  console.log(req)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/static/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
console.log(req.body.input, req.body.inputTag, file.name, req.body.user)
    const posts = postStore.createPost(req.body.input, req.body.user,`http://localhost:3000/static/images/${file.name}`, req.body.inputTag );
console.log(posts)
    res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
  });
});

app.post('/', (req, res) => {
  const { currentUser, userOfActivePage } = req.body;
  
  const response = statusStore.getStatus();
  const activeUser = statusStore.getCurrentPageUser();

  console.log('response', response, activeUser)
  res.send({ response, activeUser });
});

app.post('/:user', (req, res) => {
  const { currentUser, userOfActivePage } = req.body;
  
  const response = statusStore.getStatus();
  const activeUser = statusStore.getCurrentPageUser();

  console.log('activeUser', activeUser)
  res.send({ response, activeUser });
});

// app.get('/posts/:id', (req, res) => {
//   const posts = postStore.getPost(req.params.id)
//   // console.log(posts)
//   res.send({ posts });
// });

// app.post('/TimeLine', (req, res) => {
//   const { user } = req.body;
//  // const posts = getuserTimeLinePosts(user)
//   const posts = postStore.getuserTimeLinePosts(user);
//   res.send({ posts });
// });
// // 여기서 /posts/TimeLine 하면 안됨..... 왜 안되는지는 모르겠다.

// app.post('/user', (req, res) => {
//   const { user } = req.body;
//   const posts = postStore.getuserPosts(user);
//   res.send({ posts });
// })


// app.patch('/posts', (req, res) => {
//   const { title, user } = req.body;
//   const posts = postStore.createPost(title, user);
//   res.send( posts );
// });


// app.get('/comments/:id', (req, res) => {
//   const { id } = req.params;
//   const comments = commentStore.getCommentFromPostId(id)
//   res.send( comments );
// })

// app.post('/comments/:id', (req, res) => {
//   const { postId, inputa, currentUser, isUnder } = req.body;
//   commentStore.createComment(postId, inputa, currentUser, (isUnder!==undefined)? isUnder.id : undefined)
//   const comments = commentStore.getCommentFromPostId(postId)
//   res.send( comments );
// })

// app.post('/login', (req, res) => {
//   const { Id, Password } = req.body;
//   const loginMessageAndStatus = userStore.performLogin(Id, Password)
//   res.send( loginMessageAndStatus );
// })

// // app.post('/register', (req, res) => {
// //   console.log(req.body)
// //   const { id, password } = req.body;
// //   const registration = register.Registration(id, password)
// //   res.send( registration );
// // })


// app.patch('/postsedit', (req, res) => {
//   const { input, posting, user, indexOfCommentOnThisPosting } = req.body;
//   console.log('rrr',  input, posting)
//   const posts = edit.editThis(input, posting, user, indexOfCommentOnThisPosting);
//   res.send( posts );
// });


// app.patch('/postsRemove', (req, res) => {
//   const { posting, user, indexOfCommentOnThisPosting } = req.body;
//   const posts = remove.removeThis(posting, user, indexOfCommentOnThisPosting);
//   res.send( posts );
// });

// app.post('/userInfo', (req,res) => {
//   const user = req.body.user;
//   const postNumber = postStore.getUserPosts(user).length
//   const {image, follower, followerNumber} = userStore.getUserInfo(user)
//   const post = { image, user, postNumber, followerNumber}
//   res.send( post )  
// })

// app.patch('/postLike', (req,res) =>{
//   const { posting, currentUser, postingAll } = req.body
//   const post = postStore.changeLike(posting, currentUser, postingAll);
//   // console.log(postStore.postList)
//   res.send( post )
// })



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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  });
}

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// app.listen(3000, () => {
//   console.log(`Listening on port ${port}...`);
// });


export default app