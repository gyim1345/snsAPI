import express from 'express';
import commentStore from '../repository/commentStore'
const router = express.Router();

  
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const comments = await commentStore.getCommentFromPostId(id)
    // console.log(comments)
    res.send( comments );
  })
  
  router.post('/:id', async (req, res) => {
    // console.log(req.body)
    const { postId, inputa, currentUser, isUnder, commentId } = req.body;
    await commentStore.createComment(postId, inputa, currentUser, (isUnder!==undefined)? isUnder.id : commentId)
    const comments = await commentStore.getCommentFromPostId(postId)
    res.send( comments );
  })

export default router