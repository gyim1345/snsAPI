import express from 'express';
import postStore from '../repository/postingStore';
import edit from '../services/edit'
import remove from '../services/remove'
import register from '../services/register'

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await postStore.postList;
  res.send(posts);
});

router.get('/:id', async (req, res) => {
  const posts = await postStore.getPost(req.params.id)

  res.send({ posts });
});

router.patch('/', async (req, res) => {
  const { title, user } = req.body;
  const posts = await postStore.createPost(title, user);
  res.send(posts);
});

router.post('/register', async (req, res) => {
  const { id, password } = req.body;
  const registration = await register.Registration(id, password)
  res.send(registration);
})


router.patch('/edit', async (req, res) => {
  const { input, posting, indexOfCommentOnThisPosting } = req.body;
  const posts = await edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);
  res.send(posts);
});


router.patch('/Remove', async (req, res) => {
  const { posting, indexOfCommentOnThisPosting } = req.body;
  const posts = await remove.removeThis(posting, req.session.user.Id, indexOfCommentOnThisPosting);
  res.send(posts);
});


router.patch('/Like', async (req, res) => {
  const { posting } = req.body
  const post = await postStore.changeLike(posting, req.session.user.Id);
  res.send(post)
});


export default router;
