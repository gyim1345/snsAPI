import express from 'express';
const router = express.Router();
import postStore from '../postingStore';


router.get('/', (req, res) => {
  console.log('SearchPage', req.session)
    const posts = postStore.postList;
    res.send( posts );
  });

router.get('/tag', (req, res) => {
  const { input } = req.query;
  console.log(input);
  const posts = postStore.postForTag(input);
  console.log(posts)
  res.send( posts );
})
  export default router;
