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
  if (req.session.user.Id === null) {
    return res.status(500).json({ message: 'No session Id Found' })
  }
  const response = req.session.user.Id
  res.send({ response });
});

router.get('/randomUser', async (req, res) => {
  const response = await userStore.getRandomUser(req.session.user.Id)
  res.send( response );
});

router.patch('/AddFriend', async (req, res) => {
  console.log(req);
  console.log(req.body.name);
  console.log(req.session.user.Id);
  const response = await userStore.addFollower(req.body.name, req.session.user.Id)
  console.log(response)
  res.send({ response });
});


export default router