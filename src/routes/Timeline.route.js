import express from 'express';
import postStore from '../postingStore';
import statusStore from '../statusStore';

const router = express.Router();

router.post('/:user', (req, res) => {
    const { user } = req.body;
   // const posts = getuserTimeLinePosts(user)
    const posts = postStore.getuserTimeLinePosts(user);
    res.send({ posts });
  });

  router.post('/', (req, res) => {
    const { currentUser, userOfActivePage } = req.body;
    
    const response = statusStore.getStatus();
    res.send({ response });
  });

  export default router