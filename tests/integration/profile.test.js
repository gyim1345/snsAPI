const request = require('supertest')

import app, { db } from '../../app'
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import auth from '../../services/auth.service';
import postStore from '../../repository/postingStore.repository';
import userStore from '../../repository/userStore.repository';

describe('/profile', () => {
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

    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);

        auth.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });

        const { header } = await request(app)
            .post('/auth/login')
            .send({ Id: username, Password: 'pwd' })
        cookie = await header['set-cookie']
    })

    afterAll(async () => {
        await db.dropDatabase();
        await db.close();
    });


    describe('GET /Info', () => {
        describe('with valid input', () => {
            let Info = {
                userURL: 'htttpaaaaaaaaaa',
                name: 'gibong@gmail.com',
                postCount: 1,
                followerNumber: 1,
                nickName: 'nicknamee',
                introductory: 'wtf'
            }
            it('returns some user info and follower count', async () => {
                const { body } = await request(app)
                    .get('/profile/Info')
                    .query({ user: 'gibong@gmail.com' });

                expect(body.followerNumber).toBe(1);
                expect(body).toEqual(Info)
            })
        })
        describe('with no input', () => {
            it('responds with 400', async () => {
                const userInfo = await request(app)
                    .get('/profile/Info')

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
                    .get('/profile/Info')
                    .query({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /image', () => {
        it('returns image url', async () => {
            const imageURL = await request(app)
                .get('/profile/image')
                .query({ user: 'gibong@gmail.com' })

            expect(imageURL.text).toBe('htttpaaaaaaaaaa')
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.getUserImage = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .get('/profile/image')
                    .query({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('PATCH /Info/NickName', () => {

        describe('with valid input', () => {
            it('returns the modified nickName', async () => {
                const { body, status } = await request(app)
                    .patch('/profile/Info/NickName')
                    .set('Cookie', cookie[0])
                    .send({ input: username });

                expect(body).toBe(username)
                expect(status).toBe(200)
            })
        })
        describe('with no input', () => {
            it('responds status code of 400', async () => {
                const { statusCode } = await request(app)
                    .patch('/profile/Info/NickName')

                expect(statusCode).toBe(400);
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.editUserNickName = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/profile/Info/NickName')
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
                    .patch('/profile/Info/Introductory')
                    .send({ input: username })
                    .set('Cookie', cookie[0])

                expect(Introductory.body).toBe(username)
                expect(Introductory.status).toBe(200)
            })
        })

        describe('with no input', () => {
            it('responds with 400', async () => {
                const { statusCode } = await request(app)
                    .patch('/profile/Info/Introductory')

                expect(statusCode).toBe(400);
            })
        })
        describe('when internal error from server', () => {
            beforeEach(() => {
                userStore.editUserIntroductory = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/profile/Info/Introductory')
                    .send({ input: 'WRONG_INPUT' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
})