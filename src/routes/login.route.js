import express from 'express';
import userStore from '../repository/userStore';
import login from '../services/login';

const router = express.Router();

router.post('/', async (req, res) => {
  const { Id, Password } = req.body;
  console.log(Id)
  const loginMessageAndStatus = await login.loginValidation(Id,Password);
  const { loginStatus } = loginMessageAndStatus;
  if (!loginStatus) {
    res.status(401).send({statusMessage: 'Login Failed'});
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
