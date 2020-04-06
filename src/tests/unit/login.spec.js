import login from '../../services/login';
import userStore from '../../repository/userStore'

describe('login', () => {

    describe('checkPassword', () => {
        let id;
        let password;

        describe('with the right password of the specific id', () => {
            beforeEach(() => {
                userStore.checkPassword = jest.fn().mockResolvedValue(true)
                id = 'gibong@asd.com';
                password = 1;
            })
            it('returns true', async() => {
                const validation = await login.checkPassword(id, password)
              
                expect(validation).toBe(true)
            })
        })

        describe('with the wrong password of the specific id', () => {
            beforeEach(() => {
                userStore.checkPassword = jest.fn().mockResolvedValue(false)
                id = 'gibong@asd.com';
                password = 1;
            })
            it('returns false', async() => {
                const validation = await login.checkPassword(id, password)
               
                expect(validation).toBe(false)
            })
        })

    })

    describe('loginValidation', () => {
        let id;
        let password;

        beforeEach(()=> {
             id = 'gibong@asd.com';
             password = 1;
        })

        describe('when password validation succeeds', () => {
            beforeEach(()=> {
                login.checkPassword = jest.fn().mockResolvedValue(true)
            })
            it('returns statusMessage: LoggedIn and loginStatus: true', async() =>{
                const validation = await login.loginValidation(id, password);
             
                expect(validation.statusMessage).toBe('LoggedIn');
                expect(validation.loginStatus).toBe(true);
            })
        })

        describe('when password validation fails', () => {
            beforeEach(()=> {
                login.checkPassword = jest.fn().mockResolvedValue(false)
            })
            it('returns statusMessage: LoggedIn and loginStatus: true', async() =>{
                const validation = await login.loginValidation(id, password);
              
                expect(validation.statusMessage).toBe('Check Input');
                expect(validation.loginStatus).toBe(false);
            })
        })
    })
        // it('input id is not within a-zA-Z0-9@ range', async () => {
        //     id = '#'
        //     const response = await login.loginValidation(id, password)
        //     expect(response.statusMessage).toBe('Check Input');
        //     expect(response.loginStatus).toBe(false);
        // })

        // describe('input id is within a-zA-Z0-9@ range', () => {
        //     beforeEach(() => {
        //         id = '@'
        //     })

        //     it('input id does not exist in database', async () => {
        //         userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true)
        //         const response = await login.loginValidation(id, password)
        //         expect(response.statusMessage).toBe('Check Input');
        //         expect(response.loginStatus).toBe(false);
        //     })

    //         it('input password does not match database password of that id', async () => {
    //             userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false)
    //             userStore.checkPassword = jest.fn().mockResolvedValue(false)
    //             const response = await login.loginValidation(id, password)
    //             expect(response.statusMessage).toBe('Check Input');
    //             expect(response.loginStatus).toBe(false);
    //         })

    //         it('input id and password matches database id and its passowrd', async () => {
    //             userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false)
    //             userStore.checkPassword = jest.fn().mockResolvedValue(true)
    //             const response = await login.loginValidation(id, password)
    //             expect(response.statusMessage).toBe('LoggedIn');
    //             expect(response.loginStatus).toBe(true);
    //         })
    //     })
    // })
})