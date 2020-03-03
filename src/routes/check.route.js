import statusStore from '../statusStore'
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  const { currentUser, userOfActivePage } = req.body;

  const response = statusStore.getStatus();
  const activeUser = statusStore.getCurrentPageUser();
  res.send({ response, activeUser });
});

router.get('/', (req, res) => {
  if (req.session.user !== undefined) {
    const user = req.session.user.name;
    const response = { loggedIn: true, userName: user }
    res.send(response);
  } else {
    const response = { loggedIn: false, userName: undefined }
    res.send(response)
  }
}
);



export default router;
