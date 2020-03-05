import express from 'express';
import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

const router = express.Router();


router.post('/', (req, res) => {
    const { user } = req.body;
    const posts = postStore.getuserPosts(user);
    res.send({ posts });
  })
  

    
  router.post('/Info', (req,res) => {
    const user = req.body.user;
    const postNumber = postStore.getUserPosts(user).length
    const {image, follower, followerNumber} = userStore.getUserInfo(user)
    const post = { image, user, postNumber, followerNumber}
    res.send( post )  
  })

  export default router