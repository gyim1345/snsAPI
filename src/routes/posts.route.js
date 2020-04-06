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
    const posts = await postStore.postList();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
   try {
    const posts = await postStore.getPost(req.params.id)
    res.send({ posts });
  } catch (err) {
    res.status(500).send(err); //question: 서버가 터지면 반환할려는 500 에러인데 서버가 터지면 값을 돌려 줄수 있긴 하는지??
  }
});

router.post('/', async (req, res) => {
  const { title, user } = req.body;
  try {
    const posts = await postStore.createPost(title, user);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/register', async (req, res) => {
 
  const { id, password } = req.body;
  try {
    // const validability = await register.userIdValidation(id)
    // const availability = await register.userIdAvailability(id)
    const registration = await register.registration(id, password)
    if (!registration) {
      res.status(400).send('Check Input');
      return;
    }
    res.status(200).send(registration);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/edit', async (req, res) => {

  const { input, posting, indexOfCommentOnThisPosting } = req.body;
  try {
    const posts = await edit.editThis(input, posting, req.session.user.Id, indexOfCommentOnThisPosting);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/Remove', async (req, res) => {

  const { posting, indexOfCommentOnThisPosting } = req.body;
  try {
    const posts = await remove.removeThis(posting, req.session.user.Id, indexOfCommentOnThisPosting);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.patch('/Like', async (req, res) => {

  const { posting } = req.body
  try {
    const post = await postStore.changeLike(posting, req.session.user.Id);
    res.send(post)
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/scrap', async (req, res) => {
  const { postId } = req.body
  const message = await userStore.addPostIdToScrap(postId, req.session.user.Id);
  res.send(message);
});


// router.post('/taggedPosts', async (req, res) => {
//   if (req.body === null) {
//     return res.status(400).json({ message: 'no body found' })
//   }
//   try {
//     const { user } = req.body
//     const posts = await tag.getTaggedPosts(user);
//     if (posts[0] === undefined) {
//       return res.status(404).json({ message: 'no post found' })
//     }
//     res.send(posts);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// })

// router.get('/scrappedPosts', async (req, res) => {
//   console.log(req)
//   const posts = await scrap.getScrappedPostings(req.query.user);
//   res.send(posts);
// })



export default router;
