const request = require('supertest')
import app, { db } from '../../index';
import login from '../../services/login';
import userSchemaModel from '../../model/user';

describe('/check', () => {
    let cookie;

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

        await userSchemaModel.create(userInfo);

        login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });

        const { header } = await request(app)
            .post('/login')
            .send({ Id: 'gibong@gmail.com', Password: 'pwd' })

        cookie = await header['set-cookie']
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('POST /', () => {
        let status = { response: '', activeUser: '', currentUserAPI: userInfo.name }
        it('returns response, activeUser, currentUser', async () => {
            const { body } = await request(app)
                .post('/check')
                .set('Cookie', cookie)

            expect(body).toEqual(status)
        })
    })

    describe('GET /', () => {
        describe('with session', () => {


            it('returns response, activeUser, currentUser', async () => {
                const { body } = await request(app)
                    .get('/check')
                    .set('Cookie', cookie)

                expect(body).toEqual({ loggedIn: true, userName: userInfo.name })
            })
        })
        describe('without session', () => {
            beforeEach(async () => {
                const { header } = await request(app).delete('/login')
                cookie = await header['set-cookie']
            })
            it('returns loggedIn status true and current logged in userName', async () => {
                const { body,statusCode } = await request(app)
                    .get('/check')
                    .set('Cookie', cookie)
                    
                expect(statusCode).toBe(401);
                expect(body).toBe('unable to find session')
            })
        })
    })
})