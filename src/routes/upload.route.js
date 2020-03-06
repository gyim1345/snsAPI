import express from 'express';
import postStore from '../repository/postingStore';
import { promisify } from 'util';

const router = express.Router();

router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const { input, inputTag } = req.body;
  const user = req.session.user.Id
  try {
    await promisify(file.mv)(`/workspace/Project/snsAPI/src/static/images/${file.name}`)

    const posts = await postStore.createPost(
      input,
      user, `http://localhost:3000/static/images/${file.name}`, inputTag);
    res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default router