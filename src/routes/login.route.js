import express from 'express';
import userStore from '../userStore';

const router = express.Router();

router.post('/', async (req, res) => {
  const { Id, Password } = req.body;
  const loginMessageAndStatus = await userStore.performLogin(Id, Password)
  const { statusMessage, loginStatus } = loginMessageAndStatus
  if (loginStatus === false) {
    return res.status(401).send('Login Failed');
    }
    
    req.session.user = {
      "Id" : Id //name id 로 바꾸기
    }
  res.send( loginMessageAndStatus );
})

router.delete('/', async (req, res) =>{
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session deleted');
})

  export default router;
