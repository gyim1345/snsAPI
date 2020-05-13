import { db } from '../../app';
import userStore from '../../repository/userStore.repository';
import userSchemaModel from '../../model/user';

describe('userStore', () => {

    const userInfo = {
        name: 'gibong@gmail.com',
        userId: 33,
        userFollow: ['eeee'],
        userURL: 'http',
        password: 'pwd',
        scrap: [1, 3, 5],
        nickName: 'nicknamee',
        introductory: 'wtf'
    }

    let id;
    let userName;
    let pwd;
    let password;

    beforeEach(async () => {
        await db.dropDatabase();

        await userSchemaModel.create(userInfo);

        id = 'gibong@gmail.com';
        userName = 'gibong@gmail.com';
        pwd = 'pwd';
        password = 'pwd'

    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('userList', () => {
        it('returns list of users', async () => {
            const userList = await userStore.userList();

            expect(userList).toBeDefined();
        })

    })

    describe('getUserImage', () => {

        it('returns userImage url', async () => {
            const userImageURL = await userStore.getUserImage(userName);

            expect(userImageURL).toBe(userInfo.userURL);
        })
    })

    describe('getFollowerFromUser', () => {

        describe('when user exists', () => {
            it('returns followers of user', async () => {
                const userFollow = await userStore.getFollowerFromUser(userName);

                expect(userFollow[0]).toBe(userInfo.userFollow[0]);
            })
        })

        describe('when user does not exist', () => {
            it('returns empty ', async () => {
                const userFollower = await userStore.getFollowerFromUser();

                expect(userFollower).toBe("empty")
            })
        })

    })

    describe('getRandomUser', () => {
        it('returns users excluding self', async () => {
            const users = await userStore.getRandomUser(userName);

            expect(users).toEqual(expect.not.objectContaining(userInfo))
        })
    })

    describe('checkIdIsRegistered', () => {
        describe('when the specific id is registered', () => {
            it('returns false', async () => {
                const registered = await userStore.checkIdIsRegistered(id);

                expect(registered).toBe(false)
            })
        })

        describe('when the specific id is not registered', () => {
            beforeEach(() => {
                id = 'WRONG_ID';
            })

            it('returns true if the specific id is not registered', async () => {
                const registered = await userStore.checkIdIsRegistered(id);

                expect(registered).toBe(true)
            })
        })
    })

    describe('checkPassword', () => {
        describe('input password matches database password of the id', () => {
            it('returns true', async () => {
                const validatePassword = await userStore.checkPassword(id, password)

                expect(validatePassword).toBe(true);
            })
        })

        describe('input password does not match the database password of the id', () => {
            beforeEach(() => {
                password = 'WRONG_PASSWORD'
            })

            it('returns false', async () => {
                password = 'WRONG_PASSWORD'
                const validatePassword = await userStore.checkPassword(id, password)

                expect(validatePassword).toBe(false);
            })
        })
    })

    describe('addFollower', () => {
        let follower;

        beforeEach(() => {
            follower = 'i am follower'
        })

        it('return userinfo with follower added to its userFollow property', async () => {
            const userInfoWithAddedFollower = await userStore.addFollower(follower, userName)

            expect(userInfoWithAddedFollower.userFollow).toEqual(expect.arrayContaining([follower]))
        })
    })

    describe('addPostIdToScrap', () => {
        let IdOfPost;

        describe('when it is not scrapped', () => {
            beforeEach(() => {
                IdOfPost = 10;
            })

            it('returns a message saying scrapped', async () => {// question addPostIdToScrap 가 하는 행동 "after adding scrap id of Id to user property of scrap"  이것도 넣어야하나??
                const { message } = await userStore.addPostIdToScrap(IdOfPost, userName);

                expect(message).toBe("scrapped");
            })
        })
        describe('when it is already scrapped', () => {
            beforeEach(() => {
                IdOfPost = 3;
            })

            it('returns a message saying already scrapped', async () => {
                const { message } = await userStore.addPostIdToScrap(IdOfPost, userName);

                expect(message).toBe("already scrapped");
            })
        })
    })

    describe('getUserScrapIds', () => {
        it('returns scrapped ids for the given user', async () => {
            const scrapIds = await userStore.getUserScrapIds(userName);

            expect(scrapIds).toEqual(expect.arrayContaining(userInfo.scrap))
        })
    })

    describe('getUserInfo', () => {
        it('returns multiple infos of the user', async () => {
            const info = await userStore.getUserInfo(userName);

            expect(info.followerNumber).toBe(userInfo.userFollow.length);
            delete info.followerNumber
            expect(userInfo).toEqual(expect.objectContaining(info))
        })
    })

    describe('editUserNickName', () => {
        let input;

        beforeEach(() => {
            input = 'bongbongg'
        })

        it('returns modified nick name of the specific user', async () => {
            const userNickName = await userStore.editUserNickName(userName, input);

            expect(userNickName).toBe(input);
        })
    })

    describe('editUserIntroductory', () => {
        let input;

        beforeEach(() => {
            input = 'introducing bongbong'
        })

        it('returns modified introductory of the specific user', async () => {
            const userIntroductory = await userStore.editUserIntroductory(userName, input);

            expect(userIntroductory).toBe(input);
        })
    })

    describe('editUserImage', () => {
        let userInfo;
        let imageURL;

        beforeEach(() => {
            imageURL = 'http2'
            userInfo = {
                user: userName,
                imageUrl: imageURL
            };
        })

        it('returns modified image of the specific user', async () => {
            const { userURL } = await userStore.editUserImage(userName, imageURL);

            expect(userURL).toBe(imageURL);
        })
    })

    describe('createUser', () => {
        it('returns created user using input id and pwd based on userSchemaModel', async () => {
            const created = await userStore.createUser(id, pwd);

            expect(created).toBe(true);
        })
    })


})