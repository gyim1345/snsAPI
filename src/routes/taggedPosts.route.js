import express from 'express';
import tag from '../services/tag';

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await tag.getTaggedPosts(req.query.user);
    res.send(posts);
  })

export default router;