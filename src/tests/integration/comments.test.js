const request = require('supertest')
import app, { db } from '../../index';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user'
import commentSchemaModel from '../../model/comment';
import commentStore from '../../repository/commentStore';

describe('/comments', () => {
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

    let comments = [{
        id: 1414,
        postLId: 3,
        title: 'commentTitle',
        userName: 'gibong@gmail.com',
        like: [],
        isUnder: 1, //TIP: test에서만?? 값을 undefined를 넣으면 그 property 또한 안들어감 => 아예 없다고 취급함.
    }]

    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);

        await commentSchemaModel.create(comments);
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('POST /:id', () => {
        describe('with valid id', () => {
            it('creates comment and returns comments with the new comment', async () => {
                const input = { postId: 3, input: 'newTitle', currentUser: 'gibong@gmail.com', commentId: 4 }
                const expectedComment = { postLId: 3, userName: 'gibong@gmail.com', isUnder: 4, like: [] };
                const { body } = await request(app)
                    .post('/comments/3')
                    .send(input)
                //question: 속성이 다를때 그냥 하나씩 하는게 맞는지 아니면 그냥 저기 위에 처럼 하나 예상 값을 작성해서 expect 하는게 맞는지.
                expect(body.length).toBe(2);
                expect(body[1]).toEqual(expect.objectContaining(expectedComment))
            })
        })
        
        describe('when internal error from server', () => {
            beforeEach(() => {
                commentStore.createAndReturnCommentsOfTheSpecificId = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .post('/comments/3')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('GET /:id', () => {
        describe('with valid id', () => {
            it('returns comments', async () => {
                const { body } = await request(app)
                    .get('/comments/3')//TIP: params 를 쓰면 그냥 숫자를 직접 넣자.
                expect(body[0]).toEqual(expect.objectContaining(comments[0]))
            })
        })

        describe('with invalid id', () => {
            it('returns status code of 404 and message of Bad Request', async () => {
                const { text, statusCode } = await request(app)
                    .get('/comments/a')
                expect(statusCode).toBe(404);
                expect(text).toBe('Invalid ID.')
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                commentStore.getCommentFromPostId = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/comments/3')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })


})



