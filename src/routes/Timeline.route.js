import express from 'express';
import postStore from '../postingStore';
import statusStore from '../statusStore';
import session from 'express-session'

const router = express.Router();

router.post('/:user', (req, res) => {
  console.log(session.user)
  console.log('timeline', req.session)

    const { user } = req.body;
   // const posts = getuserTimeLinePosts(user)
    const posts = postStore.getuserTimeLinePosts(user);
    res.send({ posts });
  });

  router.post('/', (req, res) => {
    console.log('timeline', req.session)

    const { currentUser, userOfActivePage } = req.body;
    
    const response = statusStore.getStatus();
    res.send({ response });
  });

  export default router