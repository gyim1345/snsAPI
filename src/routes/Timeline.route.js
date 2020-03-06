import express from 'express';
import postStore from '../repository/postingStore';

const router = express.Router();

router.post('/:user', async (req, res) => {
  const user = req.session.user.Id;
    const posts = await postStore.getuserTimeLinePosts(user);
    res.send({ posts });
  });

  router.post('/', (req, res) => {
    const response = req.session.user.Id
    res.send({ response });
  });

  export default router