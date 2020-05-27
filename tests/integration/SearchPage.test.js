const request = require('supertest')
import app, { db } from '../../app'
import postSchemaModel from '../../model/post';
import postStore from '../../repository/postingStore.repository'

describe('/SearchPage', () => {

    const posts = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
    }]

    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(posts);

    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('GET /', () => {
        it('returns posts', async () => {
            const { statusCode, body } = await request(app)
                .get('/SearchPage')
                .query({ user: 'gibong@gmail.com' })

            expect(statusCode).toBe(200);
            expect(body[0]).toEqual(expect.objectContaining(posts[0]))
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postStore.postList = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/SearchPage')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /tag', () => {
        describe('with valid input', () => {
            it('returns posts of tagged', async () => {
                const { statusCode, body } = await request(app)
                    .get('/SearchPage/tag')
                    .query({ input: 'gibong@gmail.com' })

                expect(statusCode).toBe(200);
                expect(body[0]).toEqual(expect.objectContaining(posts[0]))
            })
        })

        describe('with no query', () => { 
            it('returns posts of tagged', async () => {
                const { statusCode, body } = await request(app)
                    .get('/SearchPage/tag')

                expect(statusCode).toBe(400);
                expect(body.message).toBe('No query found');
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                postStore.postForTag = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/SearchPage/tag')
                    .query({ input: 'gibong@gmail.com' })

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
})