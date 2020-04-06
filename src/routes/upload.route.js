import express from 'express';
import { promisify } from 'util';

import postStore from '../repository/postingStore';
import userStore from '../repository/userStore';
import validateImageUpload from '../middleware/validateImageUpload';

const router = express.Router();

router.post('/', validateImageUpload, async (req, res) => {

  const file = req.files.files;//.files.files 로 바꿈 files.file 에서
  const { input, inputTag } = req.body;
  const user = req.session.user.Id
  try {
    await promisify(file.mv)(`/workspace/Project/snsAPI/src/static/images/${file.name}`)
    const posts = await postStore.createPost(
      input,
      user, `http://localhost:3000/static/images/${file.name}`, inputTag);
    res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }
});


router.patch('/userImage', validateImageUpload, async (req, res) => {

  const file = req.files.files;
  const user = req.session.user.Id;
  const imageUrl = `http://localhost:3000/static/images/${file.name}`;
  try {
    await promisify(file.mv)(`/workspace/Project/snsAPI/src/static/images/${file.name}`)

    await userStore.editUserImage({ user, imageUrl });

    res.status(200).json('done');
  } catch (err) {
    res.status(500).send({ message: 'Internal server error' });
  }

});

export default router