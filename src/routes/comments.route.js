import express from 'express';
import commentStore from '../repository/commentStore'

const validate =require('../middleware/validate');
const validateComment = require('../model/comment');
const validateNumber = require('../middleware/validateNumber');
const router = express.Router();


router.get('/:id', validateNumber,  async (req, res) => {
  //인풋 아웃풋으로 생각하고
  //return 을 안쓰는걸로
  //부정을 강조하기 위해서 위에 그리고 원래 실행을 밑에
  try {
    const { id } = req.params;
    const comments = await commentStore.getCommentFromPostId(id)
    res.send(comments);
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/:id', async (req, res) => {
  // if (req.body === null) {
  //   return res.status(400).json({ msg: 'Bad request' });
  // }
  try {
    const { postId, inputa, currentUser, isUnder, commentId } = req.body;
    const comments = await commentStore.createAndReturnCommentsOfTheSpecificId(postId, inputa, currentUser, (isUnder !== undefined) ? isUnder.id : commentId)
    res.send(comments);

  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router