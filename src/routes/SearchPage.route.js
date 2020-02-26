import express from 'express';
const router = express.Router();
import postStore from '../postingStore';


router.get('/', (req, res) => {
    console.log('respond')
    const posts = postStore.postList;
    console.log(posts)
    res.send( posts );
  });


  export default router;
