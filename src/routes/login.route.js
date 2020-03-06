import express from 'express';
import userStore from '../repository/userStore';

const router = express.Router();

router.post('/', async (req, res) => {
  const { Id, Password } = req.body;

  const loginMessageAndStatus = await userStore.performLogin(Id, Password)
  const { loginStatus } = loginMessageAndStatus;
  if (!loginStatus) {
    res.status(401).send({message: 'Login Failed'});
    return;
  }

  req.session.user = { Id };
  res.send(loginMessageAndStatus);
})

router.delete('/', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session deleted');
})

export default router;
