import express from 'express';
import postStore from '../repository/postingStore';
import edit from '../services/edit';
import remove from '../services/remove';
import register from '../services/register';
import userStore from '../repository/userStore';
import scrap from '../services/scrap';
import tag from '../services/tag';

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
  console.log('registered1')
  const { id, password } = req.body;
  console.log(id, password);
  try {
    const registration = await register.Registration(id, password)
    if (!registration.status) {
      return res.status(400).send(registration.Message);
    }
    res.send(registration);
  } catch (err) {
    return res.status(500).send(err);
  }
});


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

router.patch('/scrap', async (req, res) => {
  const { postId } =req.body
  const message = await userStore.addPostIdToScrap(postId,req.session.user.Id);
  res.send(message);
});


router.post('/taggedPosts', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'no body found' })
  }
  try {
  const { user } = req.body
  const posts = await tag.getTaggedPosts(user);
  console.log(posts[0])
  if (posts[0] === undefined) {
    return res.status(404).json({ message: 'no post found' })
  }
  res.send(posts);
} catch (err) {
  return res.status(500).send(err);
}
})

router.get('/scrappedPosts', async (req, res) => {
  console.log(req)
  const posts = await scrap.getScrappedPostings(req.query.user);
  res.send(posts);
})



export default router;
