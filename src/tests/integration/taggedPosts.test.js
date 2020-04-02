const request = require('supertest')
import app, { db } from '../../index'
import postSchemaModel from '../../model/post';
import tag from '../../services/tag';

describe('/taggedPosts', () => {
    const post = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
    }]

    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(post);

    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('GET /', () => {
        it('returns tagged posts', async () => {
            const { statusCode, body } = await request(app)
                .get('/taggedPosts')
                .query({ user: 'gibong@gmail.com' })

            expect(statusCode).toBe(200);
            expect(body[0]).toEqual(expect.objectContaining(post[0]));
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                tag.getTaggedPosts = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/taggedPosts')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })
})