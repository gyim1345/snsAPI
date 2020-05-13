import express from 'express';
import postStore from '../repository/postingStore.repository';
import userStore from '../repository/userStore.repository';
import timelineService from '../services/timeline.services';
const router = express.Router();


router.post('/', (req, res) => {
  try {
    const response = req.session.user.Id
    res.send({ response });
  } catch (err) {
    res.status(401).json({ message: 'No session Id Found' })
  }
}
);

router.get('/randomUser', async (req, res) => {
  const response = await timelineService.getUserRecommendation(req.session.user.Id)
  res.send(response);
});

router.get('/:user', async (req, res) => {
  // console.log('asd', req.session)
  // console.log('bbb', req.sessions)
  const user = req.session.user.Id;
  const posts = await timelineService.getPostsForTimeline(user);
  res.send({ posts });
}
);


router.patch('/AddFriend', async (req, res) => {
  const response = await timelineService.addFollower(req.body.name, req.session.user.Id)
  res.send({ response });
});


export default router