import express from 'express';
import postStore from '../repository/postingStore.repository';

const router = express.Router();


router.get('/', async (req, res) => {
  if (req.query.user === undefined) {
    return res.status(400).json({ message: 'No body found' });
  }
  try {
    const { user } = req.query;
    const posts = await postStore.getuserPosts(user);
    res.send({ posts });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router