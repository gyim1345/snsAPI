import express from 'express';
import postStore from '../postingStore';
import userStore from '../userStore';
// const postStore = require('../postingStore');
const commentStore = require('../commentStore');
// const userStore = require('../userStore');
const countStore = require('../countStore');
const edit = require('../edit');
const remove = require('../remove');
// const register = require('./register');
const Like = require('../Like');


const router = express.Router();

const login = async (req, res, next) => {

  const { Id, Password } = req.body;
  console.log(';asd')
  const loginMessageAndStatus = await userStore.performLogin(Id, Password)
  // res.send( loginMessageAndStatus );

  return response(res, { loginMessageAndStatus });
}
// router.get('/posts', (req, res) => {
    //     const posts = postStore.postList;
    //     res.send( posts );
    //   });
    
    //   router.get('/posts/:id', (req, res) => {
        //     const posts = postStore.getPost(req.params.id)
        //     // console.log(posts)
        //     res.send({ posts });
        //   });
  
//   router.post('/TimeLine', (req, res) => {
//     const { user } = req.body;
//    // const posts = getuserTimeLinePosts(user)
//     const posts = postStore.getuserTimeLinePosts(user);
//     res.send({ posts });
//   });
//   // 여기서 /posts/TimeLine 하면 안됨..... 왜 안되는지는 모르겠다.
  
//   router.post('/user', (req, res) => {
//     const { user } = req.body;
//     const posts = postStore.getuserPosts(user);
//     res.send({ posts });
//   })
  
  
//   router.patch('/posts', (req, res) => {
//     const { title, user } = req.body;
//     const posts = postStore.createPost(title, user);
//     res.send( posts );
//   });
  
  
//   router.get('/comments/:id', (req, res) => {
//     const { id } = req.params;
//     const comments = commentStore.getCommentFromPostId(id)
//     res.send( comments );
//   })
  
//   router.post('/comments/:id', (req, res) => {
//     const { postId, inputa, currentUser, isUnder } = req.body;
//     commentStore.createComment(postId, inputa, currentUser, (isUnder!==undefined)? isUnder.id : undefined)
//     comments = commentStore.getCommentFromPostId(postId)
//     res.send( comments );
//   })

  
  // router.post('/register', (req, res) => {
  //   console.log(req.body)
  //   const { id, password } = req.body;
  //   const registration = register.Registration(id, password)
  //   res.send( registration );
  // })
  
  
//   router.patch('/postsedit', (req, res) => {
//     const { input, posting, user, indexOfCommentOnThisPosting } = req.body;
//     console.log('rrr',  input, posting)
//     const posts = edit.editThis(input, posting, user, indexOfCommentOnThisPosting);
//     res.send( posts );
//   });
  
  
//   router.patch('/postsRemove', (req, res) => {
//     const { posting, user, indexOfCommentOnThisPosting } = req.body;
//     const posts = remove.removeThis(posting, user, indexOfCommentOnThisPosting);
//     res.send( posts );
//   });
  
//   router.post('/userInfo', (req,res) => {
//     const user = req.body.user;
//     const postNumber = postStore.getUserPosts(user).length
//     const {image, follower, followerNumber} = userStore.getUserInfo(user)
//     const post = { image, user, postNumber, followerNumber}
//     res.send( post )  
//   })
  
//   router.patch('/postLike', (req,res) =>{
//     const { posting, currentUser, postingAll } = req.body
//     const post = postStore.changeLike(posting, currentUser, postingAll);
//     // console.log(postStore.postList)
//     res.send( post )
//   })
  

  export {login};
