import express from 'express';
import postStore from '../repository/postingStore';

const router = express.Router();

router.post('/:user', (req, res) => {
  // const { user } = req.body;
  const user = req.session.user.Id;
   // const posts = getuserTimeLinePosts(user)
    const posts = postStore.getuserTimeLinePosts(user);
    res.send({ posts });
  });

  router.post('/', (req, res) => {
    console.log('timelineasssssssssssssssssssssssssssssssssssssssssssssssss')
    const response = req.session.user.Id
    console.log('response for timeline ' , response)
    res.send({ response });
  });

  export default router