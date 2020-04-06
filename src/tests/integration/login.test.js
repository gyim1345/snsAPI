const request = require('supertest')
import app, { db } from '../../index';
import login from '../../services/login';
import userSchemaModel from '../../model/user';

describe('/login', () => {

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
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('/POST /', () => {
        describe('with valid Id and Password', () => {
            it('returns statusCode of 200', async () => {
                const { statusCode } = await request(app)
                    .post('/login')
                    .send({ Id: 'gibong@gmail.com', Password: 'pasdas' })
                
                expect(statusCode).toBe(200);
            })
        })

        describe('with Invalid Id and Password', () => {
            it('returns statusCode of 401', async () => {

                login.loginValidation = jest.fn().mockRejectedValue();

                const { statusCode } = await request(app)
                    .post('/login')
                    .send({ Id: 'gibong@gmail.com', Password: 'pasdas' })
                
                expect(statusCode).toBe(401)
            })
        })
    })

    describe('DELETE /', ()=> {
        describe('with initial session', ()=> {
            let cookie;
            
            beforeEach(async ()=> {
                login.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });

                const { header } = await request(app)
                    .post('/login')
                    .send({ Id: 'gibong@gmail.com', Password: 'pwd' })
                cookie = await header['set-cookie']
            })

            it('returns 200 and Session deleted after clearing cookie of connect.sid', async ()=> {
              const {statusCode, body} = await request(app)
              .delete('/login')
              .set('Cookie', cookie)

              expect(statusCode).toBe(200);
              expect(body).toBe('Session deleted')
            })
        })
    })
})