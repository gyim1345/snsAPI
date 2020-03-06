import express from 'express';
import postStore from '../repository/postingStore';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await postStore.postList();
    res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/tag', async (req, res) => {
  if (req.query === null) {
    return res.status(400).json({ message: 'No query found' })
  }
  const { input } = req.query;
  try {
    const posts = await postStore.postForTag(input);
    res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
})
export default router;
