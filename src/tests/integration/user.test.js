const request = require('supertest')

import app, { db } from '../../index'
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import login from '../../services/login';
import postStore from '../../repository/postingStore';
import userStore from '../../repository/userStore';

describe('/user', () => {
    let cookie;
    let username = 'gibong@gmail.com'
    let posting = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: username,
        like: ['eeeeeee'],
        tag: [username]
    }]

    let userInfo = {
        name: username,
        userId: 33,
        userFollow: ['eeee'],
        userURL: 'htttpaaaaaaaaaa',
        password: 'pwd',
        scrap: [1, 3, 5],
        nickName: 'nicknamee',
        introductory: 'wtf'
    }
    //TODO: 중복되는 상수들을 하나로 통합하고, post를 get 으로 바꾸고, 
    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);

        login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });

        const { header } = await request(app)
            .post('/login')
            .send({ Id: username, Password: 'pwd' })
        cookie = await header['set-cookie']
    })

    afterAll(async () => {
        await db.dropDatabase();
        await db.close();
    });

    describe('GET /', () => {
        describe('with valid request from client', () => { // with body 라는 말이 조금 모호한듯
            it('responds with 200 status code and posts', async () => {
                const { body, statusCode } = await request(app)
                    .get('/user')
                    .send({ user: username })

                const { posts } = body;

                expect(statusCode).toBe(200);
                expect(posts[0]).toEqual(expect.objectContaining(posting[0]))
            })
        })

        describe('with invalid request from client', () => {
            it('responds with 400', async () => {
                const { statusCode } = await request(app)
                    .get('/user')

                expect(statusCode).toBe(400);
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postStore.getuserPosts = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .get('/user')
                    .send({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /Info', () => {
        describe('with valid input', () => {
            it('returns some user info and follower count', async () => {
                const { body } = await request(app)
                    .get('/user/Info')
                    .query({ user: 'gibong@gmail.com' });
                expect(body.followerNumber).toBe(1);
                delete body.followerNumber
                expect(userInfo).toEqual(expect.objectContaining(body))
            })
        })
        describe('with no input', () => {
            it('responds with 400', async () => {
                const userInfo = await request(app)
                    .get('/user/Info')
                expect(userInfo.statusCode).toBe(400);
            })
        })
        describe('when internal error from server', () => {
            beforeEach(() => {
                postStore.getUserPostsLength = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
                userStore.getUserInfo = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .get('/user/Info')
                    .query({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /image', () => {
        it('returns image url', async () => {
            const imageURL = await request(app)
                .get('/user/image')
                .query({ user: 'gibong@gmail.com' })
            expect(imageURL.text).toBe('htttpaaaaaaaaaa')
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.getUserImage = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .get('/user/image')
                    .query({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('PATCH /Info/NickName', () => {

        describe('with valid input', () => {
            it('returns nickName', async () => {
                const NickName = await request(app)
                    .patch('/user/Info/NickName')
                    .set('Cookie', cookie[0])
                    .send({ input: username });

                expect(NickName.body).toBe(username)
                expect(NickName.status).toBe(200)
            })
        })
        describe('with no input', () => {
            it('responds with 400', async () => {
                const { statusCode } = await request(app)
                    .patch('/user/Info/NickName')
                console.log(statusCode)
                expect(statusCode).toBe(400);
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.editUserNickName = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/user/Info/NickName')
                    .send({ input: 'WRONG_INPUT' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
    describe('PATCH /Info/Introductory', () => {

        describe('with valid input', () => {
            it('returns input', async () => {
                const Introductory = await request(app)
                    .patch('/user/Info/Introductory')
                    .send({ input: username })
                    .set('Cookie', cookie[0])
                expect(Introductory.body).toBe(username)
                expect(Introductory.status).toBe(200)
            })
        })

        describe('with no input', () => {
            it('responds with 400', async () => {
                const { statusCode } = await request(app)
                    .patch('/user/Info/Introductory')
                console.log(statusCode)
                expect(statusCode).toBe(400);
            })
        })
        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.editUserIntroductory = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/user/Info/Introductory')
                    .send({ input: 'WRONG_INPUT' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

})
