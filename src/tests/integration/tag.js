// import express from 'express';
// const request = require('supertest')
// require('dotenv').config({ path: '/workspace/Project/snsAPI/src/.env.test' })
// import app, { db }  from '../../index'
// import mongoose from '../../index';
// import postSchemaModel from '../../model/post.js'
// import postingStore from '../../repository/postingStore'

// beforeAll(async () => {
//     console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

//     db.dropDatabase();
//     console.log(process.env.NODE_ENV, process.env.PORT)
//     const postModel = new postSchemaModel();
//     postModel.id = Date.now();
//     postModel.title = 'eeeeeee';
//     postModel.imageUrl = 'ueeeeeerl';
//     postModel.userName = 'naeeeeeeme';
//     postModel.like = ['eeeeeee'];
//     postModel.tag = ['gibong'];
//     await postModel.save();

// });

// afterAll(async () => {
//   await db.close();
// });

// describe('tag service', () => {
//     describe('POST /posts/taggedPosts', () => {
//         it('responds with 200 with posts containing the input in tag of posts if available', async () => {
//           const res = await request(app)
//             .post('/posts/taggedPosts')
//             .send({user: 'gibong'})
//         expect(res.body[0].tag).toContain('gibong');
//         expect(res.statusCode).toBe(200);
//         });
//      describe('if posts containing the input in tag of posts is unavailable)
//         it('responds with 404', async () => {
//             const res = await request(app)
//               .post('/posts/taggedPosts')
//               .send({user: 'UNMATCHED_USER'})
//           expect(res.body).toMatchObject({"message": "no post found"});
//           expect(res.statusCode).toBe(404);
//           });
//     });
// });