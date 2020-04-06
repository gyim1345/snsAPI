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
  res.status(200).send(loginState);
  } catch (err) {
    res.status(401).send(err);
    return; 
  }

  // if (process.env.NODE_ENV === 'test') {
  //   res.send(req.sessionID)
  //   return;
  // }

  // if (!loginState) {
  //   res.status(402).send({ statusMessage: 'Login Failed' });
  //   return;
  // }

  // res.send(loginMessageAndStatus);
})

router.delete('/', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.status(200).json('Session deleted');
})

export default router;
