import express from 'express';
import postService from '../services/post.service'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/taggedPosts', async (req, res) => {
  try {
    const posts = await postService.getTaggedPosts(req.query.user);
    res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

router.get('/scrappedPosts', async (req, res) => {
  try {
    const posts = await postService.getScrappedPosts(req.query.user);
    res.send(posts);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

router.get('/scrapped', async (req, res) => {
  const { id } = req.query
  try {
    const scrapped = await postService.getPostIsScrapped(id, req.session.user.Id);
    res.send(scrapped);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const posts = await postService.getPostById(req.params.id)
    res.send({ posts });
  } catch (err) {
    res.status(500).send(err); 
  }
});



router.post('/', async (req, res) => {
  const { title, user } = req.body;
  try {
    const posts = await postService.createPost(title, user);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/edit', async (req, res) => {

  const { input, posting } = req.body;
  try {
    const post = await postService.editTitleOfPost(input, posting, req.session.user.Id);
    res.send(post);
  } catch (err) {
    if (err === false) {
      return res.status(401).json('You dont have permission')
    }
    res.status(500).send(err);
  }
});

router.patch('/Remove', async (req, res) => {

  const { posting } = req.body;

  try {
    const posts = await postService.removePost(posting.userName, posting.id, req.session.user.Id);
    res.send(posts);
  } catch (err) {
    if (err === false) {
      return res.status(401).json('You dont have permission')
    }
    res.status(500).send(err);
  }
});


router.patch('/Like', async (req, res) => {

  const { posting } = req.body
  try {
    const post = await postService.changeLike(posting, req.session.user.Id);
    res.send(post)
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/scrap', async (req, res) => {
  const { postId } = req.body
  const message = await postService.scrapPost(postId, req.session.user.Id);
  res.send(message);
});

export default router;
