import express from 'express';
const router = express.Router();

const commentStore = require('../commentStore');

  
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const comments = commentStore.getCommentFromPostId(id)
    res.send( comments );
  })
  
  router.post('/:id', (req, res) => {
    console.log(req.body)
    const { postId, inputa, currentUser, isUnder, commentId } = req.body;
    commentStore.createComment(postId, inputa, currentUser, (isUnder!==undefined)? isUnder.id : commentId)
    const comments = commentStore.getCommentFromPostId(postId)
    res.send( comments );
  })

export default router