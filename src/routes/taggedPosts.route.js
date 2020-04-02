import express from 'express';
import tag from '../services/tag';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const posts = await tag.getTaggedPosts(req.query.user);
    res.send(posts);
  } catch(err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
  })

export default router;