import express from 'express';
const router = express.Router();
import postStore from '../postingStore';


router.get('/', (req, res) => {
    const posts = postStore.postList;
    res.send( posts );
  });


  export default router;
