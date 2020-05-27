const request = require('supertest')
import app, { db } from '../../app'

import postSchemaModel from '../../model/post';
import commentSchemaModel from '../../model/comment';
import userSchemaModel from '../../model/user';
import postStore from '../../repository/postingStore.repository';

import auth from '../../services/auth.service';
import postService from '../../services/post.service'

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

        auth.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
        const req = await request(app).post('/auth/login').send({ Id: 'gibong@gmail.com', Password: 'pwd' })
        cookie = await req.header['set-cookie']

    })

    afterAll(async () => {
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

    describe('GET /taggedPosts', () => {
        it('returns tagged posts', async () => {

            const { statusCode, body } = await request(app)
                .get('/posts/taggedPosts')
                .query({ user: 'gibong@gmail.com' })

            expect(statusCode).toBe(200);
            expect(body[0]).toEqual(expect.objectContaining(posts[0]));
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postService.getTaggedPosts = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/posts/taggedPosts')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /scrappedposts', () => {
        it('returns posts', async () => {
            const { statusCode, body } = await request(app)
                .get('/posts/scrappedPosts')
                .query({ user: 'gibong@gmail.com' })

            expect(statusCode).toBe(200);
            expect(body[0]).toEqual(expect.objectContaining(posts[0]))
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postService.getScrappedPostings = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/posts/scrappedPosts')
                    .query({ input: 'gibong@gmail.com' })

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
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
                .send({ title: 'newTitle', user: 'gibong@gmail.com' })
            expect(body.title).toBe('newTitle');
            expect(body.userName).toBe('gibong@gmail.com');
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

    describe('PATCH /edit', () => {

        describe('with ownership', () => {
            it('returns post with edited title', async () => {
                const { body } = await request(app)
                    .patch('/posts/edit')
                    .send({ input: 'newTitle', posting: posts[0] })
                    .set('Cookie', cookie)

                expect(body[0].title).toBe('newTitle')
            })
        })
        describe('without ownership', () => {
            beforeEach(() => {
                postService.checkOwnershipOfPost = jest.fn().mockResolvedValue(true)
            })
            it('returns post with edited title', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/posts/edit')
                    .send({ input: 'newTitle', posting: posts[0] })
                    .set('Cookie', cookie)

                expect(body).toBe('You dont have permission')
                expect(statusCode).toBe(401)
            })

        })

    })

    describe('with internal server error', () => {
        it('returns 500 status code', async () => {
            postService.editPost = jest.fn().mockRejectedValue();
            const req = await request(app)
                .patch('/posts/edit')

            expect(req.statusCode).toBe(500);
        })
    })

    describe('PATCH /Remove', () => {
        describe('with ownership', () => {
            beforeEach(async () => {
                postService.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
            })
            it('returns something after removing the post', async () => {
                const { body } = await request(app)
                    .patch('/posts/Remove')
                    .send({ posting: posts[0] })
                    .set('Cookie', cookie)

                expect(body).toBe(true)
            })
        })

        describe('without ownership', () => {
            beforeEach(async () => {
                postService.checkOwnershipOfPost = jest.fn().mockResolvedValue(true)
            })
            it('returns something after removing the post', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/posts/Remove')
                    .send({ posting: posts[0] })
                    .set('Cookie', cookie)

                expect(body).toBe('You dont have permission')
                expect(statusCode).toBe(401)
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                postService.removePost = jest.fn().mockRejectedValue();
                const { statusCode } = await request(app)
                    .patch('/posts/Remove')
                    .send({ posting: posts[0] })
                    .set('Cookie', cookie)

                expect(statusCode).toBe(500);
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


    describe('GET /scrapped', () => {
        describe('check if the post is scrapped for the current user', () => {
            it('returns true or false depending if it is included', async () => {
                const { body } = await request(app)
                    .get('/posts/scrapped')
                    .set('Cookie', cookie)
                    .query({ id: 1})

                expect(body).toBe(true)
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                const { body, status } = await request(app)
                    .get('/posts/scrapped')

                expect(status).toBe(500)
                expect(body.message).toBe('Internal server error')
            })
        })
    })
})