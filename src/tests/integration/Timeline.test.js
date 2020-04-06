const request = require('supertest')

import app, { db } from '../../index'
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import login from '../../services/login';

describe('/Timeline', () => {
    let cookie;
    let posting = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttpaaaaaaaaaa',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
    }]

    let userInfo = [{
        name: 'gibong@gmail.com',
        userId: 33,
        userFollow: ['eeee'],
        userURL: 'htttpaaaaaaaaaa',
        password: 'pwd',
        scrap: [1, 3, 5],
        nickName: 'nicknamee',
        introductory: 'wtf'
    },
    {
        name: 'gibong@gmaasdil.com',
        userId: 33,
        userFollow: ['eeee'],
        userURL: 'htttpaaaaaaaaaa',
        password: 'pwd',
        scrap: [1, 3, 5],
        nickName: 'nicknamee',
        introductory: 'wtf'
    }]

    beforeEach(async () => {
        await db.dropDatabase();

        await postSchemaModel.create(posting);

        await userSchemaModel.create(userInfo);

        login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
        const req = await request(app).post('/login').send({ Id: 'gibong@gmail.com', Password: 'pwd' })
        cookie = await req.header['set-cookie']
    })

    afterAll(async () => {
        await db.dropDatabase();
        
        await db.close();
   
    });


    describe('POST /:user', () => {
        it('returns posts of the user', async () => {
            const { body } = await request(app)
                .post('/Timeline/:user')
                .query('gibong@gmail.com')
                .set('Cookie', cookie[0])

            const { posts } = body;
            
            expect(posts[0]).toEqual(expect.objectContaining(posting[0]))
        })
    })

    describe('POST /', () => {

        describe('with session', () => {
            it('returns 200 and input', async () => {
                const { status, body } = await request(app)
                    .post('/Timeline')
                    .set('Cookie', cookie[0])

                expect(status).toBe(200);
                expect(body.response).toBe('gibong@gmail.com')
                //TODO: body.response를 나중에 프론트랑 같이 바꿀것. (Timeline.route 쪽도.)
            })
        })

        describe('without session', () => {

            beforeEach(async () => {
                await request(app).delete('/login')
            })

            it('returns 401 status code and body message saying No session Id Found', async () => {
                const { status, body } = await request(app)
                    .post('/Timeline')

                expect(status).toBe(401);
                expect(body.message).toBe("No session Id Found")
            })
        })
    })

    describe('GET /randomUser', () => {
        it('returns users excluding self', async () => {
            const { body } = await request(app)
                .get('/Timeline/randomUser')
                .set('Cookie', cookie)

            expect(body[0].name).toEqual(expect.not.stringContaining('gibong@gmail.com'))
        })
    })

    describe('PATCH /AddFriend', () => {
        it('returns haha', async () => {
            const { body } = await request(app)
                .patch('/Timeline/AddFriend')
                .set('Cookie', cookie)
                .send({ name: 'Johnson' })

            expect(body.response.userFollow).toEqual(expect.arrayContaining(['Johnson']))
        })
    })
})