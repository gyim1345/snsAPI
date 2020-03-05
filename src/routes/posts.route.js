import express from 'express';
import postStore from '../repository/postingStore';
import edit from '../services/edit'
import remove from '../services/remove'
// import userStore from '../repository/userStore';
// const postStore = require('../postingStore');
// const commentStore = require('../commentStore');
// const userStore = require('../userStore');
// const countStore = require('../countStore');
// const edit = require('../edit');
// const remove = require('../remove');
// const Like = require('../Like');
// const register = require('./register');


const router = express.Router();
console.log('zzzzz')



router.get('/', (req, res) => {
        console.log('respond')
        const posts = postStore.postList;
        res.send( posts );
      });
    
  router.get('/:id', (req, res) => {
            const posts = postStore.getPost(req.params.id)
            // console.log(posts)
            res.send({ posts });
          });
  
  // router.post('/TimeLine', (req, res) => {
  //   const { user } = req.body;
  //  // const posts = getuserTimeLinePosts(user)
  //  console.log('timelinepost')
  //   const posts = postStore.getuserTimeLinePosts(user);
  //   res.send({ posts });
  // });
//   // 여기서 /posts/TimeLine 하면 안됨..... 왜 안되는지는 모르겠다.
  

  
  router.patch('/', (req, res) => {
    const { title, user } = req.body;
    const posts = postStore.createPost(title, user);
    res.send( posts );
  });
  


  
  router.post('/register', (req, res) => {
    const { id, password } = req.body;
    const registration = register.Registration(id, password)
    res.send( registration );
  })
  
  
  router.patch('/edit', (req, res) => {
    const { input, posting, indexOfCommentOnThisPosting } = req.body;
    // console.log(input, posting, user, indexOfCommentOnThisPosting )
    const posts = edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);
    // console.log(posts)
    res.send( posts );
  });
  
  
  router.patch('/Remove', (req, res) => {
    const { posting, indexOfCommentOnThisPosting } = req.body;
    const posts = remove.removeThis(posting, req.session.user.Id, indexOfCommentOnThisPosting);
    res.send( posts );
  });

  
  router.patch('/Like', (req,res) =>{
    const { posting, postingAll } = req.body
    const post = postStore.changeLike(posting, req.session.user.Id, postingAll);
    res.send( post )
  });
  

  export default router;
