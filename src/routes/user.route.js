import express from 'express';
import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

const router = express.Router();


router.post('/', async (req, res) => {
    const { user } = req.body;
    const posts = await postStore.getuserPosts(user);
    res.send({ posts });
  })
  

    
  router.post('/Info', async (req,res) => {
    const user = req.body.user;
    // console.log(user)
    let postNumber = await postStore.getUserPostsLength(user)
    postNumber=postNumber.length
    const {image, follower, followerNumber} = await userStore.getUserInfo(user)
    // console.log (image, follower, followerNumber )
    const post = { image, user, postNumber, followerNumber}
    res.send( post )  
  })

  export default router