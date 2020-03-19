import register from '../../services/register'
import userStore from '../../repository/userStore'

describe('Register', () => {

    describe('Registration', () => {
        let id;
        let password;
        beforeAll(() => {
            password = 1;
     })

        it('check id is not within a-zA-Z0-9@ range', async()=> {
            id='#'
            const response = await register.Registration(id, password)
            // expect(response).toEqual(expect.objectContaining({ Message: "Check Input", status: false }))
            expect(response.Message).toBe('Check Input');
            expect(response.status).toBe(false);
        })


        describe('id is within a-zA-Z0-9@ range', ()=> {
            
            it('id is already registered', async() => {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false);
                const response = await register.Registration(id, password)
                expect(response.Message).toBe('Check Input');
                expect(response.status).toBe(false);
            })

            it('register id with password', async() => {
              id='@'
              userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true);
              userStore.createUser = jest.fn().mockResolvedValue();  
              const response = await register.Registration(id, password)
              expect(response.Message).toBe('Registered')
              expect(response.status).toBe(true)
        })
    })


    })
})