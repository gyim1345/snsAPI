import express from 'express';
import postStore from '../repository/postingStore';
const router = express.Router();


router.get('/', async (req, res) => {
  console.log('SearchPage')
  console.log('hello')
    const posts = await postStore.postList();
    console.log(posts)
    res.send( posts );
  });

router.get('/tag', async (req, res) => {
  const { input } = req.query;
  // console.log(input);
  const posts = await postStore.postForTag(input);
  // console.log(posts)
  res.send( posts );
})
  export default router;
