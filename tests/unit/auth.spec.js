import auth from '../../services/auth.service'
import userStore from '../../repository/userStore.repository'

describe('auth', () => {
    let id;
    let password;

    beforeEach(() => {
        id = 'gibong@asd.com'
    })

    describe('userIdValidation', () => {

        describe('when it follows the format whatever@whatever.com with top-level domain having 2~4 character length', () => {
            it('returns true ', async () => {
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(true)
            })
        })

        describe('without @ ', () => {
            it('returns false', async () => {
                id = 'INVALIDEMAIL.com'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })

        describe('without . ', () => {
            it('returns false', async () => {
                id = 'INVALID@EMAILcom'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })
        describe('when the subdomain of the id is not within the character range of A~Z or a~z or . or - ', () => {
            it('returns false', async () => {
                id = 'INVALID#@EMAIL.com'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })
        describe('when the second-level domain of the id is not within the character range of A~Z or a~z or . or - ', () => {
            it('returns false', async () => {
                id = 'INVALID@EM#AIL.com'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })
        describe('when the top-level domain character length is below 2', () => {
            it('returns false', async () => {
                id = 'INAVLID@EMAIL.c'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })
        describe('when the id of top-level domain character length is above 4 ', () => {
            it('returns false', async () => {
                id = 'INVALID@EMAIL.commm'
                const validability = await auth.userIdValidation(id);

                expect(validability).toBe(false)
            })
        })
    })

    describe('userIdAvailability', () => {
        beforeEach(() => {
            userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(false);
        })

        describe('when the specific id already exists in the db', () => {
            it('returns false', async () => {
                const availability = await auth.userIdAvailability(id);

                expect(availability).toBe(false);
            });
        })

    });

    describe('userIdAvailability', () => {
        describe('when the specific id does not exists in the db ', () => {
            beforeEach(() => {
                userStore.checkIdIsRegistered = jest.fn().mockResolvedValue(true);
            })

            it('returns true', async () => {
                const availability = await auth.userIdAvailability(id);

                expect(availability).toBe(true);
            });
        });
    });

    describe('registration', () => {
        describe('when after creating user', () => {
            beforeEach(() => {
                auth.userIdValidation = jest.fn().mockResolvedValue(true);
                auth.userIdAvailability = jest.fn().mockResolvedValue(true);
                userStore.createUser = jest.fn().mockResolvedValue(true);
            })

            it('returns true', async () => {
                const registered = await auth.registration(id, password);

                expect(registered).toBe(true);
            })
        })

        describe('checkPassword', () => {
            let id;
            let password;

            describe('with the right password of the specific id', () => {
                beforeEach(() => {
                    userStore.checkPassword = jest.fn().mockResolvedValue(true)
                    id = 'gibong@asd.com';
                    password = 1;
                })
                it('returns true', async () => {
                    const validation = await auth.checkPassword(id, password)

                    expect(validation).toBe(true)
                })
            })

            describe('with the wrong password of the specific id', () => {
                beforeEach(() => {
                    userStore.checkPassword = jest.fn().mockResolvedValue(false)
                    id = 'gibong@asd.com';
                    password = 1;
                })
                it('returns false', async () => {
                    const validation = await auth.checkPassword(id, password)

                    expect(validation).toBe(false)
                })
            })

        })

        describe('loginValidation', () => {
            let id;
            let password;

            beforeEach(() => {
                id = 'gibong@asd.com';
                password = 1;
            })

            describe('when password validation succeeds', () => {
                beforeEach(() => {
                    auth.checkPassword = jest.fn().mockResolvedValue(true)
                })
                it('returns statusMessage: LoggedIn and loginStatus: true', async () => {
                    const validation = await auth.loginValidation(id, password);
                    expect(validation.loginStatus).toBe(true);
                })
            })

            describe('when password validation fails', () => {
                beforeEach(() => {
                    auth.checkPassword = jest.fn().mockResolvedValue(false)
                })

                it('returns statusMessage: LoggedIn and loginStatus: false', () => {
                    expect(auth.loginValidation(id, password)
                    ).rejects.toBeTruthy();
                })
            })
        })
    })
})
   