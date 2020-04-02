import express from 'express';
import userStore from '../repository/userStore';
import login from '../services/login';

const router = express.Router();

router.post('/', async (req, res) => {
  const { Id, Password } = req.body;
  try{
  const loginMessageAndStatus = await login.loginValidation(Id, Password);
  req.session.user = { Id };
  // console.log(req.session)
  // console.log(loginMessageAndStatus)
  const { loginState } = loginMessageAndStatus;
  // console.log(loginState)
  // console.log(req.sessionID)
  } catch (err) {
    return res.status(401).send(err);
  }

  if (process.env.NODE_ENV === 'test') {
    return res.send(req.sessionID)
  }

  if (!loginState) {
    res.status(401).send({ statusMessage: 'Login Failed' });
    return;
  }

  return res.send(loginMessageAndStatus);
})

router.delete('/', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session deleted');
})

export default router;
