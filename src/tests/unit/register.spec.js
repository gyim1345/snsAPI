import register from '../../services/register'
import userStore from '../../repository/userStore'

describe('register', () => {
    let id;
    let password;

    beforeEach(()=> {
        id = 'gibong@asd.com'
    })

    describe('userIdValidation', () => {

        describe('when it follows the format whatever@whatever.com with top-level domain having 2~4 character length', () => {
            it('returns true ', async () => {
                const validability = await register.userIdValidation(id);
               
                expect(validability).toBe(true)
            })
        })

        describe('without @ ', () => {
            it('returns false', async () => {
                id = 'INVALIDEMAIL.com'
                const validability = await register.userIdValidation(id);
              
                expect(validability).toBe(false)
            })
        })

        describe('without . ', () => {
            it('returns false', async () => {
                id = 'INVALID@EMAILcom'
                const validability = await register.userIdValidation(id);
                
                expect(validability).toBe(false)
            })
        })
        describe('when the subdomain of the id is not within the character range of A~Z or a~z or . or - ', () => {
            it('returns false', async () => {
                id = 'INVALID#@EMAIL.com'
                const validability = await register.userIdValidation(id);
               
                expect(validability).toBe(false)
            })
        })
        describe('when the second-level domain of the id is not within the character range of A~Z or a~z or . or - ', () => {
            it('returns false', async () => {
                id = 'INVALID@EM#AIL.com'
                const validability = await register.userIdValidation(id);
               
                expect(validability).toBe(false)
            })
        })
        describe('when the top-level domain character length is below 2', () => {
            it('returns false', async () => {
                id = 'INAVLID@EMAIL.c'
                const validability = await register.userIdValidation(id);
               
                expect(validability).toBe(false)
            })
        })
        describe('when the id of top-level domain character length is above 4 ', () => {
            it('returns false', async () => {
                id = 'INVALID@EMAIL.commm'
                const validability = await register.userIdValidation(id);
               
                expect(validability).toBe(false)
            })
        })
    })

    describe('userIdAvailability', () => {
        beforeEach(()=> {
            userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false);
        })

        describe('when the specific id already exists in the db', () => {
            it('returns false', async () => {
                const availability = await register.userIdAvailability(id);
                
                expect(availability).toBe(false);
            });
        })

    });

    describe('userIdAvailability', () => {
        describe('when the specific id does not exists in the db ', () => {
            beforeEach(()=> {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true);
            })

            it('returns true', async () => {
                const availability = await register.userIdAvailability(id);
               
                expect(availability).toBe(true);
            });
        });
    });

    describe('registration', () => {
        describe('when after creating user', () => {
            beforeEach(()=> {
                register.userIdValidation = jest.fn().mockResolvedValue(true);
                register.userIdAvailability = jest.fn().mockResolvedValue(true);
                userStore.createUser = jest.fn().mockResolvedValue(true);            })
            
            it('returns true', async () => {
                const registered = await register.registration(id, password);

                expect(registered).toBe(true);
            })
        })
    })

    // describe('Registration', () => {

    //     beforeAll(() => {
    //         password = 1;
    //     })



    //     it('check id is not within a-zA-Z0-9@ range', async () => {
    //         id = '#'
    //         const response = await register.Registration(id, password)
    //         // expect(response).toEqual(expect.objectContaining({ Message: "Check Input", status: false }))
    //         expect(response.Message).toBe('Check Input');
    //         expect(response.status).toBe(false);
    //     })


    //     describe('id is within a-zA-Z0-9@ range', () => {

    //         it('id is already registered', async () => {
    //             userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false);
    //             const response = await register.Registration(id, password)
    //             expect(response.Message).toBe('Check Input');
    //             expect(response.status).toBe(false);
    //         })

    //         it('register id with password', async () => {
    //             id = '@'
    //             userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true);
    //             userStore.createUser = jest.fn().mockResolvedValue();
    //             const response = await register.Registration(id, password)
    //             expect(response.Message).toBe('Registered')
    //             expect(response.status).toBe(true)
    //         })
    //     })
    //     // 태스트 의도가 잘 들어 나지 않을때 코드를 고쳐야 된다는 신호 이다.

    // })
})