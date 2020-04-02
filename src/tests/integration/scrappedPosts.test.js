const request = require('supertest')
import app, { db } from '../../index';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import scrap from '../../services/scrap';

describe('/scrappedPosts', () => {
    let posting = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
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

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('GET /', () => {
        it('returns posts', async () => {
            const { statusCode, body } = await request(app)
                .get('/scrappedPosts')
                .query({ user: 'gibong@gmail.com' })

            expect(statusCode).toBe(200);
            expect(body[0]).toEqual(expect.objectContaining(posting[0]))
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                scrap.getScrappedPostings = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/scrappedPosts')
                    .query({ input: 'gibong@gmail.com' })

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
})