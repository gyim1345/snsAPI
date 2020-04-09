import express from 'express';
import commentStore from '../repository/commentStore.repository'
import commentService from '../services/comment.service';
// const validate =require('../middleware/validate.txt');
// const validateComment = require('../model/comment');
const validateNumber = require('../middleware/validateNumber');
const router = express.Router();

import commentSchema from '../model/comment';


router.get('/:id', validateNumber,  async (req, res) => {
  //인풋 아웃풋으로 생각하고
  //return 을 안쓰는걸로
  //부정을 강조하기 위해서 위에 그리고 원래 실행을 밑에
  try {
    const { id } = req.params;
    const comments = await commentService.getCommentForPost(id)
    res.send(comments);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
 
  try {
    const comments = await commentService.createComment(req.body)
    res.send(comments);

  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.patch('/:id', async (req, res) => {
 
  try {
    const comments = await commentService.removeComment(req.body)
    res.send(comments);

  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });//missing
  }
});

// router.patch('/:id/like', async (req, res) => {
 
//   try { //missing
//     const comments = await commentService.removeComment(req.body)
//     res.send(comments);

//   } catch (err) {
//     res.status(500).send({ message: 'Internal server error' });//missing
//   }
// });

export default router