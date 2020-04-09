import express from 'express';
import userStore from '../repository/userStore.repository';
import auth from '../services/auth.service';
import validateSession from '../middleware/validateSession';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { Id, Password } = req.body;
  try{
  const {loginStatus} = await auth.loginValidation(Id, Password);
  req.session.user = { Id };
  res.status(200).json(loginStatus);
  } catch (err) {
    res.status(401).send(err);
    return; 
  }
})

router.delete('/login', async (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.status(200).json('Session deleted');
})

router.post('/register', async (req, res) => {
 
  const { id, password } = req.body;
  try {
    // const validability = await register.userIdValidation(id)
    // const availability = await register.userIdAvailability(id)
    const registration = await auth.registration(id, password)
    if (!registration) {
      res.status(400).send('Check Input');
      return;
    }
    res.status(200).send(registration);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/changeStatus', validateSession, (req, res) => {
  const response = '';
  const activeUser = '';
  const sessionUserName = req.session.user.Id;
  res.send({ response, activeUser, sessionUserName });
});

router.get('/getStatus', validateSession, (req, res) => {
    const user = req.session.user.Id;
    const response = { loggedIn: true, userName: user }
    res.send(response);
}
);

export default router;
