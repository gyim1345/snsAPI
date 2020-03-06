import express from 'express';
import postStore from '../repository/postingStore';

const router = express.Router();

router.post('/:user', async (req, res) => {
  const user = req.session.user.Id;
  try {
    const posts = await postStore.getuserTimeLinePosts(user);
    res.send({ posts });
  } catch (err) { 
    return res.status(500).send(err);
  }
  });

  router.post('/', (req, res) => {
    if(req.session.user.Id === null) {
      return res.status(500).json({ message: 'No session Id Found' })
    }
    const response = req.session.user.Id
    res.send({ response });
  });

  export default router