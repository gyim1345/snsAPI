import express from 'express';
import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

const router = express.Router();


router.post('/', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'No body found' });
  }
  const { user } = req.body;
  try {
    const posts = await postStore.getuserPosts(user);
    res.send({ posts });
  } catch (err) {
    return res.status(500).send(err);
  }
});



router.post('/Info', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ message: 'No body found' });
  }
  const user = req.body.user;
  try {
    let postNumber = await postStore.getUserPostsLength(user);
    postNumber = postNumber.length;
    const { image, follower, followerNumber } = await userStore.getUserInfo(user);
    const post = { image, user, postNumber, followerNumber };
    res.send(post);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/image', async (req,res) => {
  const { user } = req.body;
  const image = await userStore.getUserImage(user);  
  return res.send(image);
})

export default router