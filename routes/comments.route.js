import express from 'express';
import commentStore from '../repository/commentStore.repository'
import commentService from '../services/comment.service';
const validateNumber = require('../middleware/validateNumber');
const router = express.Router();

import commentSchema from '../model/comment';


router.get('/:id', validateNumber, async (req, res) => {
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

router.patch('/edit', async (req, res) => {
  const { input, posting, username, index } = req.body;
  try {
    const post = await commentService.editTitleOfComment(input, posting, req.session.user.Id, index);
    res.send(post);
  } catch (err) {
    if (err.message === 'unauthorized') {
      return res.status(401).send({ message: 'You dont have permission'})
    }
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.patch('/:id', async (req, res) => {
  const { posting, index } = req.body
  try {
    const comments = await commentService.removeComment(posting, index)
    res.send(comments);

  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

export default router