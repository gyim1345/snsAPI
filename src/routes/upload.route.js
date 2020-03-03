import express from 'express';
import postStore from '../postingStore';

const router = express.Router();


router.post('/upload', async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    const file = req.files.file;
    const { input, user, inputTag } = req.body;
    try {
      await promisify(file.mv)(`${__dirname}/static/images/${file.name}`)
      
      const posts = postStore.createPost(
        input, 
        user, `http://localhost:3000/static/images/${file.name}`, inputTag);
        res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
      } catch (err) {
        return res.status(500).send(err);
      }
      
    });

export default router