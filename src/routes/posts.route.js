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
// const register = require('../services');
import register from '../services/register'

const router = express.Router();
// console.log('zzzzz')



router.get('/', async (req, res) => {
        // console.log('respond')
        const posts = await postStore.postList;
        res.send( posts );
      });
    
  router.get('/:id', async (req, res) => {
            const posts = await postStore.getPost(req.params.id)
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
  

  
  router.patch('/', async (req, res) => {
    const { title, user } = req.body;
    const posts = await postStore.createPost(title, user);
    res.send( posts );
  });
  


  
  router.post('/register', async (req, res) => {
    const { id, password } = req.body;
    const registration = await register.Registration(id, password)
    res.send( registration );
  })
  
  
  router.patch('/edit', async (req, res) => {
    const { input, posting, indexOfCommentOnThisPosting } = req.body;
    // console.log("input:", input, posting, indexOfCommentOnThisPosting, req.session.user.Id )
    const posts = await edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);
    // console.log(posts)
    res.send( posts );
  });
  
  
  router.patch('/Remove', async (req, res) => {
    const { posting, indexOfCommentOnThisPosting } = req.body;
    const posts = await remove.removeThis(posting, req.session.user.Id, indexOfCommentOnThisPosting);
    res.send( posts );
  });

  
  router.patch('/Like', async (req,res) =>{
    const { posting, postingAll } = req.body
    const post = await postStore.changeLike(posting, req.session.user.Id, postingAll);
    res.send( post )
  });
  

  export default router;
