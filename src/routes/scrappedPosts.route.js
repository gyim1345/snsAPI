import express from 'express';
import scrap from '../services/scrap';

const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const posts = await scrap.getScrappedPostings(req.query.user);
    res.send(posts);
  } catch(err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
  })


  export default router;