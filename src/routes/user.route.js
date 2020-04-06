import express from 'express';
import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

const router = express.Router();


router.get('/', async (req, res) => {
  if (req.body.user === undefined) {
    return res.status(400).json({ message: 'No body found' });
  }

  try {
    const { user } = req.body;
    const posts = await postStore.getuserPosts(user);
    res.send({ posts });
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
});


router.get('/Info', async (req, res) => {
  if (req.query.user === undefined) {
    return res.status(400).json({ message: 'No body found' });
  }

  try {
    const user = req.query.user;
    let postNumber = await postStore.getUserPostsLength(user);
    postNumber = postNumber.length;
    const { userURL, followerNumber, nickName, introductory, name } = await userStore.getUserInfo(user);
    const userInfo = await { userURL, name, postNumber, followerNumber, nickName, introductory };
    res.send(userInfo);
  }
  catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/image', async (req, res) => {

  try {
    const { user } = req.query;
    const imageURL = await userStore.getUserImage(user);
    return res.send(imageURL);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

router.patch('/Info/NickName', async (req, res) => {
  if (req.body.input === undefined) {
    return res.status(400).json({ message: 'No input found' });
  }

  try {
    const { input } = req.body;
    const NickName = await userStore.editUserNickName(req.session.user.Id, input);
    return res.json(NickName);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

router.patch('/Info/Introductory', async (req, res) => {
  if (req.body.input === undefined) {
    return res.status(400).json({ message: 'No input found' });
  }

  try {
    const { input } = req.body;
    const Introductory = await userStore.editUserIntroductory(req.session.user.Id, input);
    return res.json(Introductory);
  } catch (err) {
    return res.status(500).send({ message: 'Internal server error' });
  }
})

export default router