const request = require('supertest')

import app, { db } from '../../app'
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import auth from '../../services/auth.service';
import postStore from '../../repository/postingStore.repository';
import userStore from '../../repository/userStore.repository';

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

    describe('GET /', () => {
        describe('with valid request from client', () => { 
            it('responds with 200 status code and posts', async () => {
                const { body, statusCode } = await request(app)
                    .get('/user')
                    .query({ user: username })
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
                    .query({ user: 'WRONG_EMAIL' });

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

   
        


})
