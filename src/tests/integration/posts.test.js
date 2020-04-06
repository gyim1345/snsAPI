const request = require('supertest')
import app, { db } from '../../index'

import postSchemaModel from '../../model/post';
import commentSchemaModel from '../../model/comment';
import userSchemaModel from '../../model/user';
import postStore from '../../repository/postingStore';

import register from '../../services/register';
import login from '../../services/login';
import edit from '../../services/edit';
import remove from '../../services/remove';

describe('/posts', () => {
    let cookie;
    let sessionUserName = 'gibong@gmail.com';
    const posts = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
    }];

    let comments = [{
        id: 1414,
        postLId: 3,
        title: 'commentTitle',
        userName: 'gibong@gmail.com',
        like: [],
        isUnder: 1,
    }, {
        id: 1412414,
        postLId: 142,
        title: 'commentTitle',
        userName: 'gibong@gmail.com',
        like: [],
        isUnder: 3,
    }]

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

        await postSchemaModel.create(posts);

        await commentSchemaModel.create(comments);

        await userSchemaModel.create(userInfo);

        login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
        const req = await request(app).post('/login').send({ Id: 'gibong@gmail.com', Password: 'pwd' })
        cookie = await req.header['set-cookie']

    })

    afterAll(async () => {
        // await db.dropDatabase();

        await db.close();
    });

    describe('GET /', () => {
        it('returns all posts', async () => {
            const { body } = await request(app)
                .get('/posts')

            expect(body[0]).toEqual(expect.objectContaining(posts[0]))
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                postStore.postList = jest.fn().mockRejectedValue();
                const { statusCode } = await request(app)
                .get('/posts')

                expect(statusCode).toBe(500);
            })
        })

    })

    describe('GET /:id', () => {
        it('returns post of the following id', async () => {
            const { body } = await request(app)
                .get('/posts/3')

            expect(body.posts[0]).toEqual(expect.objectContaining(posts[0]))
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                postStore.getPost = jest.fn().mockRejectedValue();
                const req = await request(app)
                .get('/posts/3')

                expect(req.statusCode).toBe(500);
            })
        })
    })

    describe('POST /', () => {
        it('returns edited post', async () => {
            const { body } = await request(app)
                .post('/posts')
                .send({ title: 'newTitle', user: 'newUserName' })

            expect(body.title).toBe('newTitle');
            expect(body.userName).toBe('newUserName');
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                postStore.createPost = jest.fn().mockRejectedValue();
                const { statusCode } = await request(app)
                .post('/posts')

                expect(statusCode).toBe(500);
            })
        })
    })

    describe('POST /register', () => {
        describe('with valid inputs', () => {
            it('creates user and returns true with status code 200', async () => {
                const { body, statusCode } = await request(app)
                    .post('/posts/register')
                    .send({ id: 'newuser@gmail.com', password: 'myPassword' })
               
                expect(statusCode).toBe(200);
                expect(body).toBe(true);
            })
        })

        describe('with invalid inputs', () => {
            it('returns 400 status code', async () => {
                const { statusCode } = await request(app)
                    .post('/posts/register')
                    .send({ id: 'WRONG_INPUT', password: 'password' });
                expect(statusCode).toBe(400);
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                register.registration = jest.fn().mockRejectedValue();
                const req = await request(app)
                .post('/posts/register')

                expect(req.statusCode).toBe(500);
            })
        })
    })

    describe('PATCH /edit', () => {

        describe('when it is a post', () => {
            beforeEach(async () => {
                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
                edit.checkIfPostOrComment = jest.fn().mockResolvedValue(true)
            })
            it('returns post with edited title', async () => {
                const { body } = await request(app)
                    .patch('/posts/edit')
                    .send({ input: 'newTitle', posting: posts[0] })
                    .set('Cookie', cookie)

                expect(body[0].title).toBe('newTitle')
            })
        })
    })

    describe('PATCH /edit', () => {
        describe('when it is a comment', () => {
            beforeEach(async () => {
                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
                edit.checkIfPostOrComment = jest.fn().mockResolvedValue(false)
            })

            it('returns comments with specific comment title edited', async () => {
                const { body } = await request(app)
                    .patch('/posts/edit')
                    .send({ input: 'newTitle', posting: comments, indexOfCommentOnThisPosting: 0 })
                    .set('Cookie', cookie)

                expect(body[0].title).toBe('newTitle')
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                edit.editThis = jest.fn().mockRejectedValue();
                const req = await request(app)
                .patch('/posts/edit')

                expect(req.statusCode).toBe(500);
            })
        })
    })

    describe('PATCH /Remove', () => {
        describe('when it is a post', () => {
            beforeEach(async () => {
                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(true)
                // edit.checkIfPostOrComment = jest.fn().mockResolvedValue(false)
            })
            it('returns something after removing the post', async () => {
                const res = await request(app)
                    .patch('/posts/Remove')
                    .send({ posting: posts[0] })
                    .set('Cookie', cookie)
            })
        })

        describe('when it is a comment', () => {
            it('returns something after removing the post', async () => {
                const res = await request(app)
                    .patch('/posts/Remove')
                    .send({ posting: comments, indexOfCommentOnThisPosting: 0 })
                    .set('Cookie', cookie)
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                remove.removeThis = jest.fn().mockRejectedValue();
                const req = await request(app)
                .patch('/posts/Remove')

                expect(req.statusCode).toBe(500);
            })
        })
    })

    describe('PATCH /Like', () => {
        it('returns post with like changed', async () => {
            const { body } = await request(app)
                .patch('/posts/Like')
                .set('Cookie', cookie)
                .send({ posting: posts[0] })

            expect(body.like).toEqual(expect.arrayContaining([sessionUserName]))
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                postStore.changeLike = jest.fn().mockRejectedValue();
                const req = await request(app)
                .patch('/posts/Like')

                expect(req.statusCode).toBe(500);
            })
        })
    })

    describe('PATCH /scrap', () => {
        describe('when it is not a duplicate', () => {
            it('returns message saying scrapped', async () => {
                const { body } = await request(app)
                    .patch('/posts/scrap')
                    .set('Cookie', cookie)
                    .send({ postId: 2 })

                expect(body.message).toBe('scrapped')
            })
        })

        describe('when it is a duplicate', () => {
            it('returns message saying already scrapped', async () => {
                const { body } = await request(app)
                    .patch('/posts/scrap')
                    .set('Cookie', cookie)
                    .send({ postId: 3 })
                    
                expect(body.message).toBe('already scrapped')
            })
        })
    })

})