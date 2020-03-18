import login from '../../services/login';
import userStore from '../../repository/userStore'

describe('login', () => {

    describe('loginValidation', () => {

        let id;
        let password = 1;

        it('input id is not within a-zA-Z0-9@ range', async () => {
            id = '#'
            const response = await login.loginValidation(id, password)
            expect(response.statusMessage).toBe('Check Input');
            expect(response.loginStatus).toBe(false);
        })

        describe('input id is within a-zA-Z0-9@ range', () => {
            beforeEach(()=>{
                id ='@'
            })

            it('input id does not exist in database', async () => {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true)
                const response = await login.loginValidation(id, password)
                expect(response.statusMessage).toBe('Check Input');
                expect(response.loginStatus).toBe(false);
            })

            it('input password does not match database password of that id', async () => {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false)
                userStore.checkPassword = jest.fn().mockResolvedValue(false)
                const response = await login.loginValidation(id, password)
                expect(response.statusMessage).toBe('Check Input');
                expect(response.loginStatus).toBe(false);
            })

            it('input id and password matches database id and its passowrd', async () => {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false)
                userStore.checkPassword = jest.fn().mockResolvedValue(true)
                const response = await login.loginValidation(id, password)
                expect(response.statusMessage).toBe('LoggedIn');
                expect(response.loginStatus).toBe(true);
            })
        })
    })
})