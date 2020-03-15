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
  // if (req.body === null) {
  //   return res.status(400).json({ message: 'No body found' });
  // }
  const user = req.body.user;
  // try {
    let postNumber = await postStore.getUserPostsLength(user);
    postNumber = postNumber.length;
    const { image, follower, followerNumber, userNickName, userIntroductory } = await userStore.getUserInfo(user);
    const post = await { image, user, postNumber, followerNumber, userNickName, userIntroductory };
   console.log('thispost', post);
    res.send(post);
  // } 
  // catch (err) {
  //   return res.status(500).send(err);
  // }
});

router.post('/image', async (req,res) => {
  const { user } = req.body;
  const image = await userStore.getUserImage(user);  
  return res.send(image);
})

router.patch('/Info/NickName', async (req,res) => {
  const { input } = req.body;
  const resinput = await userStore.editUserNickName(req.session.user.Id, input);  
  return res.send(resinput);
})

router.patch('/Info/Introductory', async (req,res) => {
  const { input } = req.body;
  const resinput = await userStore.editUserIntroductory(req.session.user.Id, input);  
  return res.send(resinput);
})

export default router