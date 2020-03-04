import express from 'express';
import postStore from '../postingStore';
import postSchemaModel from '../model/post';
import { promisify } from 'util';


const router = express.Router();




router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const { input, user, inputTag } = req.body;
  try {
    await promisify(file.mv)(`/workspace/Project/snsAPI/src/static/images/${file.name}`)
//     let postModel = new postSchemaModel();
//     postModel.id = 1231;
//     postModel.title = 'title';
//     postModel.imageUrl = 'contetna';
//     postModel.userName = 'usernameasd';
//     postModel.like =['suck', 'balls'];
//     postModel.tag=[];
//     postModel.save();
// console.log('asdasdsad')
// console.log('asdaspromisify')

      const posts = postStore.createPost(
        input, 
        user, `http://localhost:3000/static/images/${file.name}`, inputTag);
        res.json({ fileName: file.name, filePath: `/static/images/${file.name}`, posts });
      } catch (err) {
        return res.status(500).send(err);
      }
      
    });

export default router