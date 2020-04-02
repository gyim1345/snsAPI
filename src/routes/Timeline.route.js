import express from 'express';
import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

const router = express.Router();

router.post('/:user', async (req, res) => {
  const user = req.session.user.Id;
  const posts = await postStore.getuserTimeLinePosts(user);
  res.send({ posts });
}
);

router.post('/', (req, res) => {
  try {
    const response = req.session.user.Id
    res.send({ response });
  } catch (err) {
    if (req.session.user === undefined) {
      return res.status(401).json({ message: 'No session Id Found' })
    }
    return res.status(500).send(err);
  }
});

router.get('/randomUser', async (req, res) => {
  const response = await userStore.getRandomUser(req.session.user.Id)
  res.send(response);
});

router.patch('/AddFriend', async (req, res) => {
  const response = await userStore.addFollower(req.body.name, req.session.user.Id)
  res.send({ response });
});


export default router