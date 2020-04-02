const request = require('supertest')
import app, { db } from '../../index';


describe('/login', () => {

    describe('/POST /', () => {
        describe('with valid Id and Password', () => {
            it('returns statusCode of 401', async () => {
                const { statusCode } = await request(app)
                    .post('/login')
                    .send({ Id: 'gibong@gmail.com', Password: 'pasdas'})
                expect(statusCode).toBe(401);
            })
        })

        describe('with Invalid Id and Password', () => {
            it('returns statusCode of 401')
        })
    })
})