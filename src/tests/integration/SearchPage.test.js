const request = require('supertest')
import app, { db } from '../../index'
import postSchemaModel from '../../model/post';
import postStore from '../../repository/postingStore'

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

        describe('with no query', () => { //question query 가 없을때 에러 input 이 공백일때는 되긴함. 이거 있어야함???
            it('returns posts of tagged', async () => {
                const { statusCode, body } = await request(app)
                    .get('/SearchPage/tag')

                expect(statusCode).toBe(400);
                expect(body.message).toBe('No query found');
            })
        })
//question: internal server 500 처리하는거 중복 너무 많긴한데 중간에 조금씩 다른게 너무 많아서 어떻게 하지?? 
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