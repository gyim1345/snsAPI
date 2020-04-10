import express from 'express';
import postStore from '../repository/postingStore.repository';
import userStore from '../repository/userStore.repository';
import userService from  '../services/user.services'
import postService from '../services/post.service';

const router = express.Router();


router.get('/', async (req, res) => {
  if (req.query.user === undefined) {
    return res.status(400).json({ message: 'No body found' });
  }
  try {
    const { user } = req.query;
    const posts = await postStore.getuserPosts(user);
    res.send({ posts });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});


router.get('/Info', async (req, res) => {
  if (req.query.user === undefined) {
    return res.status(400).json({ message: 'No body found' });
  }

  try {
    const user = req.query.user;
    const userInfo = await userService.getUserInfoForUserPage(user);
    res.send(userInfo);
  }
  catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/image', async (req, res) => {

  try {
    const { user } = req.query;
    const imageURL = await userService.getUserProfileImage(user);
    res.send(imageURL);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
})

router.patch('/Info/NickName', async (req, res) => {
  if (req.body.input === undefined) {
    return res.status(400).json({ message: 'No input found' });
  }

  try {
    const { input } = req.body;
    const nickname = await userService.editUserNickName(req.session.user.Id, input);
    res.status(200).json(nickname);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
})

router.patch('/Info/Introductory', async (req, res) => {
  if (req.body.input === undefined) {
    return res.status(400).json({ message: 'No input found' });
  }

  try {
    const { input } = req.body;
    const Introductory = await userService.editUserIntroductory(req.session.user.Id, input);
     res.json(Introductory);
  } catch (err) {
     res.status(500).send({ message: 'Internal server error' });
  }
})


export default router