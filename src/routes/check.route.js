import express from 'express';
const router = express.Router();
import validateSession from '../middleware/validateSession';

router.post('/', validateSession, (req, res) => {
  // if (req.session.user === undefined) {
  //   return res.status(500).json({ message: 'unable to find session'})
  // }
  const response = '';
  const activeUser = '';
  // if(req.session.user !== undefined){
  const currentUserAPI = req.session.user.Id;
  res.send({ response, activeUser, currentUserAPI });
  // }
});

router.get('/', validateSession, (req, res) => {
  
  
  // if (req.session.user !== undefined) {
    const user = req.session.user.Id;
    const response = { loggedIn: true, userName: user }
    res.send(response);
  // } else {
  //   const response = { loggedIn: false, userName: undefined }
  //   res.send(response)
  // }
}
);



export default router;
