import express from 'express';
import postStore from '../repository/postingStore';
import edit from '../services/edit'
import remove from '../services/remove'
import register from '../services/register'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await postStore.postList;
    res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  if (req.params === null) {
    return res.status(400).json({ msg: 'No param found' });
  }
  try {
    const posts = await postStore.getPost(req.params.id)
    res.send({ posts });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.patch('/', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  const { title, user } = req.body;
  try {
    const posts = await postStore.createPost(title, user);
    res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/register', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  const { id, password } = req.body;
  try {
    const registration = await register.Registration(id, password)
    res.send(registration);
  } catch (err) {
    return res.status(500).send(err);
  }
})


router.patch('/edit', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  const { input, posting, indexOfCommentOnThisPosting } = req.body;
  try {
    const posts = await edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);
    res.send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
});


router.patch('/Remove', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  const { posting, indexOfCommentOnThisPosting } = req.body;
  try {
  const posts = await remove.removeThis(posting, req.session.user.Id, indexOfCommentOnThisPosting);
  res.send(posts);
} catch (err) {
  return res.status(500).send(err);
}
});


router.patch('/Like', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  const { posting } = req.body
  try {
    const post = await postStore.changeLike(posting, req.session.user.Id);
    res.send(post)
  } catch (err) {
    return res.status(500).send(err);
  }
});


export default router;
