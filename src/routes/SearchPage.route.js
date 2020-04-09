import express from 'express';
import postStore from '../repository/postingStore.repository';
import searchPageService from '../services/searchPage.service';
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await searchPageService.getPicturesForSearchPage();
    res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/tag', async (req, res) => {
  if (req.query.input === undefined ) {
    return res.status(400).json({ message: 'No query found' })
  }
  const { input } = req.query;
  try {
    const posts = await searchPageService.getPostOfSpecificTag(input);
    res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})
export default router;
