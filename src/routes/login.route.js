import express from 'express';
import userStore from '../repository/userStore';
import login from '../services/login';

const router = express.Router();

router.post('/', async (req, res) => {
  const { Id, Password } = req.body;
  // const loginstatusss = await login.loginValidation(Id, Password);
  const loginMessageAndStatus = await userStore.performLogin(Id, Password)
  const { loginStatus } = loginMessageAndStatus;
  if (!loginStatus) {
    res.status(401).send({message: 'Login Failed'});
    return;
  }

  req.session.user = { Id };
  res.send(loginMessageAndStatus);
  // console.log(loginstatusss);
  
  // res.send('hhohoho')
})

router.delete('/', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session deleted');
})

export default router;
