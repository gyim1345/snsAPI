const request = require('supertest')
import app, { db } from '../../app';
import auth from '../../services/auth.service';
import userSchemaModel from '../../model/user';

describe('/auth', () => {

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

    describe('POST /login', () => {
        describe('with valid inputs', () => {
            it('returns status code of 200 and true', async () => {
                const { body, statusCode} = await request(app)
                    .post('/auth/login')
                    .send({Id: 'gibong@gmail.com', Password: 'pwd'})

                expect(body).toBe(true)
                expect(statusCode).toBe(200)
            })
        })

        describe('without valid inputs', () => {
            it('returns status code of 401 and false', async () => {
                const { body, statusCode} = await request(app)
                    .post('/auth/login')
                    .send({Id: 'gibong@gmail.com', Password: 'pw1d'})

                    expect(body).toBe(false)
                expect(statusCode).toBe(401)
            })
        })
    })

    describe('DELETE /login', () => {
        it('Removes session', async () => {
            const { body, statusCode } = await request(app)
                .delete('/auth/login')
                 
            expect(body).toBe('Session deleted');
            expect(statusCode).toBe(200);
        })
    })

    describe('POST /register', () => {
        describe('with valid inputs', () => {
            it('creates user and returns true with status code 200', async () => {
                const { body, statusCode } = await request(app)
                    .post('/auth/register')
                    .send({ id: 'newuser@gmail.com', password: 'myPassword' })
               
                expect(statusCode).toBe(200);
                expect(body).toBe(true);
            })
        })

        describe('with invalid inputs', () => {
            it('returns 400 status code', async () => {
                const { statusCode } = await request(app)
                    .post('/auth/register')
                    .send({ id: 'WRONG_INPUT', password: 'password' });
                expect(statusCode).toBe(400);
            })
        })

        describe('with internal server error', () => {
            it('returns 500 status code', async () => {
                auth.registration = jest.fn().mockRejectedValue();
                const req = await request(app)
                .post('/auth/register')

                expect(req.statusCode).toBe(500);
            })
        })
    })




    describe('POST /changeStatus', () => {
        beforeEach(async () => {
            
            auth.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
    
            const { header } = await request(app)
                .post('/auth/login')
                .send({ Id: 'gibong@gmail.com', Password: 'pwd' })
    
            cookie = await header['set-cookie']
        });
        let cookie
        let status = { response: '', activeUser: '', sessionUserName: userInfo.name }
        it('returns response, activeUser, currentUser', async () => {
            const { body } = await request(app)
                .post('/auth/changeStatus')
                .set('Cookie', cookie)
       
            expect(body).toEqual(status)
        })
    })

    describe('GET /getStatus', () => {
        let cookie
        beforeEach(async () => {
    
            auth.loginValidation = jest.fn().mockResolvedValue({ loginStatea: true });
    
            const { header } = await request(app)
                .post('/auth/login')
                .send({ Id: 'gibong@gmail.com', Password: 'pwd' })
    
            cookie = await header['set-cookie']
        });

        describe('with session', () => {
            it('returns response, activeUser, currentUser', async () => {
                const { body } = await request(app)
                    .get('/auth/getStatus')
                    .set('Cookie', cookie)

                expect(body).toEqual({ loggedIn: true, userName: userInfo.name })
            })
        })

        describe('without session', () => {
            beforeEach(async () => {
                const { header } = await request(app).delete('/auth/login')
                cookie = await header['set-cookie']
            })

            it('returns loggedIn status true and current logged in userName', async () => {
                const { body,statusCode } = await request(app)
                    .get('/auth/getStatus')
                    .set('Cookie', cookie)
                    
                expect(statusCode).toBe(401);
                expect(body).toBe('unable to find session')
            })
        })
    })

})