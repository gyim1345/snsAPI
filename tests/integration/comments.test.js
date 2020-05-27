const request = require('supertest')
import app, { db } from '../../app';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user'
import commentSchemaModel from '../../model/comment';
import commentService from '../../services/comment.service'
import auth from '../../services/auth.service';

describe('/comments', () => {
    let cookie;
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
        replyToCommentId: 1, 
    }]


    beforeEach(async () => {

        await db.dropDatabase();

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);

        await commentSchemaModel.create(comments);

        auth.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
        const req = await request(app).post('/auth/login').send({ Id: 'gibong@gmail.com', Password: 'pwd' })
        cookie = await req.header['set-cookie']

        jest.clearAllMocks();
    })

    afterEach(async ()=> {
        jest.clearAllMocks();

    })

    afterAll(async () => {
        await db.close();

    });

    describe('POST /:id', () => {
        describe('with valid id', () => {
            describe('when it is a comment', ()=> {
                it('creates comment and returns comments with the new comment', async () => {
                    const input = { postId: 3, input: 'newTitle', username: 'gibong@gmail.com'}
                    const expectedComment = { postLId: 3, userName: 'gibong@gmail.com', like: [] };
                    const { body } = await request(app)
                        .post('/comments/3')
                        .send(input)

                    expect(body.length).toBe(2);
                    expect(body[1]).toEqual(expect.objectContaining(expectedComment))
                })
            })
            describe('when it is a reply to reply comment', ()=> {
            it('creates comment and returns comments with the new comment', async () => {
                const inputReply = { postId: 3, input: 'newTitle', username: 'gibong@gmail.com', index: 4 }
                const expectedCommentReply1 = { postLId: 3, userName: 'gibong@gmail.com', replyToCommentId: 4, like: [] };
                const { body } = await request(app)
                    .post('/comments/3')
                    .send(inputReply)

                expect(body.length).toBe(2);
                expect(body[1]).toEqual(expect.objectContaining(expectedCommentReply1))
            }
        )})
        })
        
        describe('when internal error from server', () => {
            beforeEach(() => {
                commentService.createComment = jest.fn().mockRejectedValue(new Error('Somthing wrong'))

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
                    .get('/comments/3')
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
                commentService.getCommentForPost = jest.fn().mockRejectedValue(new Error('Somthing wrong'))
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .get('/comments/3')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })

    describe('PATCH /:id', () => {
        beforeEach(async()=> {

            let comments1 = {
                id: 2,
                postLId: 3,
                title: 'commentTitle',
                userName: 'gibong@gmail.com',
                like: [],
                replyToCommentId: 1414,
            }
            comments.push(comments1)
            await commentSchemaModel.create(comments1);

        })
        
        it('removes the specific comment matching the id and its reply', async() => {
            const input = { posting: comments, index: 1414}
            const req = await request(app)
                .patch('/comments/3')
                .send(input)
                expect(req.body.length).toBe(0)
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                commentService.removeComment = jest.fn().mockRejectedValue()
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/comments/3')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })


    describe('PATCH /edit', () => {
        beforeEach(async()=> {

            let comments1 = {
                id: 2,
                postLId: 3,
                title: 'commentTitle',
                userName: 'gibong@gmail.com',
                like: [],
                replyToCommentId: 1414, 
            }
            comments.push(comments1)
            await commentSchemaModel.create(comments1);

        })
        
        it('edits the title of comment', async() => {
            const inputTitle = "new title";
            const inputIndex = 0;
            const input = { input: inputTitle, posting: comments, index: inputIndex}
            const req = await request(app)
                .patch('/comments/edit')
                .send(input)
                .set('Cookie', cookie)
                expect(req.body[inputIndex].title).toBe(inputTitle)
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                commentService.checkOwnership = jest.fn().mockResolvedValue(true)
            });

            it('returns status code of 401 and message of Internal server error', async () => {
                const inputTitle = "new title";
                const inputIndex = 0;
                const input = { input: inputTitle, posting: comments, index: inputIndex}
                const { body, statusCode } = await request(app)
                    .patch('/comments/edit')
                    .send(input)
                    .set('Cookie', cookie)

                expect(statusCode).toBe(401);
                expect(body.message).toBe('You dont have permission');
            })
        })

        describe('when internal error from server', () => {
            beforeEach(() => {
                commentService.editTitleOfComment = jest.fn().mockRejectedValue()
            });

            it('returns status code of 500 and message of Internal server error', async () => {
                const { body, statusCode } = await request(app)
                    .patch('/comments/edit')

                expect(statusCode).toBe(500);
                expect(body.message).toBe('Internal server error');
            })
        })
    })



})



