import express from 'express';
import scrap from '../services/scrap';

const router = express.Router();

router.get('/', async (req, res) => {
    console.log(req)
    const posts = await scrap.getScrappedPostings(req.query.user);
    res.send(posts);
  })


  export default router;