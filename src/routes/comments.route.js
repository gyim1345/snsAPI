import express from 'express';
import commentStore from '../repository/commentStore'
const router = express.Router();


router.get('/:id', async (req, res) => {
  if (req.params === null) {
    return res.status(400).json({ msg: 'No id found' });
  }
  try {
    const { id } = req.params;
    const comments = await commentStore.getCommentFromPostId(id)
    res.send(comments);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/:id', async (req, res) => {
  if (req.body === null) {
    return res.status(400).json({ msg: 'No body found' });
  }
  try {
    const { postId, inputa, currentUser, isUnder, commentId } = req.body;
    await commentStore.createComment(postId, inputa, currentUser, (isUnder !== undefined) ? isUnder.id : commentId)
    const comments = await commentStore.getCommentFromPostId(postId)
    res.send(comments);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router