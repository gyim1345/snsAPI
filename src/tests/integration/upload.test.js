const request = require('supertest')

import app, { db } from '../../index';
import userSchemaModel from '../../model/user';
import login from '../../services/login';
import userStore from '../../repository/userStore';
import postStore from '../../repository/postingStore';

describe('/login', () => {
    let cookie;

    let userInfo = {
        name: 'gibong@gmail.com',
        userId: 33,
        userFollow: ['eeee'],
        userURL: 'htttpaaaaaaaaaa',
        password: 'pwd',
        scrap: [1, 3, 5],
        nickName: 'nicknamee',
        introductory: 'wtf'
    }

    beforeEach(async () => {
        await db.dropDatabase();

        await userSchemaModel.create(userInfo);

        login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });

        const { header } = await request(app)
            .post('/login')
            .send({ Id: 'gibong@gmail.com', Password: 'pwd' })
        cookie = await header['set-cookie']

    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });


    describe('POST /', () => {
        const uploadedFile = {
            fileName: '1.jpg',
            filePath: '/static/images/1.jpg',

        }
        const posts = {
            like: [],
            tag: ['newInputTag'],
            title: 'newInput',
            imageUrl: 'http://localhost:3000/static/images/1.jpg',
            userName: 'gibong@gmail.com',
        }

        it('creates posts and returns fileName, filePath, and the created post', async () => {
            const { body } = await request(app)
                .post('/upload')
                .attach('files', '/workspace/Project/snsAPI/src/static/images/1.jpg')
                .field({ input: 'newInput', inputTag: 'newInputTag' })
                .set('Cookie', cookie)

            expect(body).toEqual(expect.objectContaining(uploadedFile))
            expect(body.posts).toEqual(expect.objectContaining(posts))
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postStore.createPost = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .post('/upload')
                    .attach('files', '/workspace/Project/snsAPI/src/static/images/1.jpg')
                    .field({ input: 'newInput', inputTag: 'newInputTag' })
                    .set('Cookie', cookie)
                    
                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('PATCH /userImage', () => {

        it('edits Image and returns status code of 200 and a message of done', async () => {
            const { body, statusCode } = await request(app)
                .patch('/upload/userImage')
                .attach('files', '/workspace/Project/snsAPI/src/static/images/1.jpg')
                .set('Cookie', cookie)

            expect(statusCode).toBe(200);
            expect(body).toBe('done');
        })



        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.editUserImage = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/upload/userImage')
                    .attach('files', '/workspace/Project/snsAPI/src/static/images/1.jpg')
                    .set('Cookie', cookie)

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
    describe('when no file is sent', () => {
        it('returns status code of 401 and message of Internal server error', async () => {
            const { statusCode, body} = await request(app)
                .patch('/upload/userImage')
                .set('Cookie', cookie)

            expect(statusCode).toBe(401);
            expect(body).toBe('No file uploaded');
        })
    })
})