import express from 'express';
const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require("path");

import validateImageUpload from '../middleware/validateImageUpload';
import postService from '../services/post.service';
import userService from '../services/user.services';

const router = express.Router();
const AWS = require("aws-sdk");

// AWS.config.loadFromPath("config/awsconfig.json");
AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region : process.env.region
  });
  
let s3 = new AWS.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'snsimagefiles', 
        key: function (req, file, cb) {
            let extension = path.basename(file.originalname);
            cb(null, Date.now().toString() + extension)
        },
        acl: 'public-read-write'
    })
})


router.post('/', upload.single('files'), validateImageUpload, async (req, res) => {
    const { originalname, location } = req.file;
    const { input, inputTag } = req.body;
    console.log('input')
    const user = req.session.user.Id
    try {
        const posts = await postService.uploadPost(
            input,
            user, location, inputTag);
        res.json({ fileName: originalname, filePath: location, posts });
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }
});


router.patch('/userImage', upload.single('files'), validateImageUpload, async (req, res) => {
   
    const { location } = req.file;
    const username = req.session.user.Id;
    try {
        await userService.editUserProfileImage(username, location);
        res.status(200).json('done');
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' });
    }

});

export default router