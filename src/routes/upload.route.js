import express from 'express';
import { promisify } from 'util';

import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';

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


router.post('/userImage', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const { input, inputTag } = req.body;
  const user = req.session.user.Id;
  const imageUrl = `http://localhost:3000/static/images/${file.name}`;
  console.log(imageUrl);
  try {
    await promisify(file.mv)(`/workspace/Project/snsAPI/src/static/images/${file.name}`)

    const posts = await userStore.editUserImage({user, imageUrl});

    res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
  } catch (err) {
    return res.status(500).send(err);
  }

});

export default router