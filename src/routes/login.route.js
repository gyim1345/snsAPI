import express from 'express';
import userStore from '../repository/userStore';
import login from '../services/login';

const router = express.Router();

router.post('/', async (req, res) => {
  try{
  const { Id, Password } = req.body;
  const loginMessageAndStatus = await login.loginValidation(Id,Password);
  const { loginStatus } = loginMessageAndStatus;
  if (!loginStatus) {
    res.status(401).send({statusMessage: 'Login Failed'});
    return;
  }
} catch (err) {
  return res.status(401).send(err);
}
  res.send(loginMessageAndStatus);
  req.session.user = { Id };
})

router.delete('/', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session deleted');
})

export default router;
