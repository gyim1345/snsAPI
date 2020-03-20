import { db } from '../../index';
import userStore from '../../repository/userStore';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';

describe('userStore', () => {
    let postModel;
    let userModel;
    let userInfo;
    let posting;
    beforeEach(async () => {
        db.dropDatabase();
        postModel = new postSchemaModel();
        postModel.id = 3;
        postModel.title = 'eeeeeee';
        postModel.imageUrl = 'htttp';
        postModel.userName = 'naeeeeeeme';
        postModel.like = ['eeeeeee'];
        postModel.tag = ['gibong'];
        await postModel.save();

        posting = {
            id: 3,
            title: 'eeeeeee',
            imageUrl: 'htttp',
            userName: 'naeeeeeeme',
            like: ['eeeeeee'],
            tag: ['gibong']
        }

        userModel = new userSchemaModel();
        userModel.name = 'gibong';
        userModel.userId = 33;
        userModel.userFollow = ['eeee'];
        userModel.userURL = 'http';
        userModel.password = 'pwd';
        userModel.scrap = [1, 3, 5];
        userModel.nickName = 'nicknamee';
        userModel.introductory = 'wtf';
        await userModel.save();

        userInfo = {
            name: 'gibong',
            userId: 33,
            userFollow: ['eeee'],
            userURL: 'http',
            password: 'pwd',
            scrap: [1, 3, 5],
            nickName: 'nicknamee',
            introductory: 'wtf'
        }
    })

    afterAll(async () => {
        await db.close();
    });

    describe('userList', () => {
        it('returns list of users', async () => {
            const userList = await userStore.userList();
            expect(userList).toBeDefined();
        })

    })

    describe('getUserImage', () => {
        let user;

        it('returns userImage url', async () => {
            user = 'gibong'
            const userImage = await userStore.getUserImage(user);
            expect(userImage).toBe(userInfo.userURL);
        })
    })

    describe('getFollowerFromUser', () => {

        describe('when user exists', () => {
            it('returns followers of user', async () => {
                let userName = 'gibong'
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
        let user;
        it('returns users excluding self', async () => {
            user = 'gibong';
            const users = await userStore.getRandomUser(user);
            expect(users).toEqual(expect.not.objectContaining(posting))
        })
    })

    describe('checkIdIsRegistered', () => {
        let id;
        describe('when the specific id is registered', () => {
            it('returns false', async () => {
                id = 'gibong';
                const registered = await userStore.checkIdIsRegistered(id);
                expect(registered).toBe(false)
            })
        })
        describe('when the specific id is not registered', () => {
            it('returns true if the specific id is not registered', async () => {
                id = 'asdasd';
                const registered = await userStore.checkIdIsRegistered(id);
                expect(registered).toBe(true)
            })
        })
    })
    describe('checkPassword', () => {
        let id;
        let password;
        describe('input password matches database password of the id', () => {
        it('returns true', async () => {
            id = 'gibong'
            password = 'pwd'
            const validatePassword = await userStore.checkPassword(id, password)
            expect(validatePassword).toBe(true);
        })
    })
    describe('input password does not match the database password of the id', () => {
        it('returns false', async () => {
            id = 'gibong'
            password = 'pwd1'
            const validatePassword = await userStore.checkPassword(id, password)
            expect(validatePassword).toBe(false);
        })
    })
    })
    describe('addFollower', () => {
        let follower;
        let currentUser;
        it('return userinfo with follower added to its userFollow property', async () => {
            follower = 'i am follower'
            currentUser = 'gibong'
            const userInfoWithAddedFollower = await userStore.addFollower(follower, currentUser)
            expect(userInfoWithAddedFollower.userFollow).toEqual(expect.arrayContaining([follower]))
        })
    })

    describe('addPostIdToScrap', () => {
        let Id;
        let currentUser;
        describe('when it is not scrapped', () => {
        it('returns a message saying scrapped', async () => {// question addPostIdToScrap 가 하는 행동 "after adding scrap id of Id to user property of scrap"  이것도 넣어야하나??
            Id = 10;
            currentUser = 'gibong'
            const { message } = await userStore.addPostIdToScrap(Id, currentUser);
            expect(message).toBe("scrapped");
        })
    })
    describe('when it is already scrapped', () => {
        it('returns a message saying already scrapped', async () => {
            Id = 3;
            currentUser = 'gibong'
            const { message } = await userStore.addPostIdToScrap(Id, currentUser);
            expect(message).toBe("already scrapped");
        })
    })
    })

    describe('getUserScrapIds', () => {
        let user;

        it('returns scrapped ids for the given user', async () => {
            user = 'gibong';
            const scrapIds = await userStore.getUserScrapIds(user);
            expect(scrapIds).toEqual(expect.arrayContaining(userInfo.scrap))
        })
    })

    describe('getUserInfo', () => {
        let user;

        it('returns multiple infos of the user', async () => {
            user = 'gibong';
            const { image, follower, followerNumber, userNickName, userIntroductory } = await userStore.getUserInfo(user);
            expect(image).toBe(userInfo.userURL);
            expect(follower).toEqual(expect.arrayContaining(userInfo.userFollow));
            expect(followerNumber).toBe(userInfo.userFollow.length);
            expect(userNickName).toBe(userInfo.nickName);
            expect(userIntroductory).toBe(userInfo.introductory);
        })
    })

    describe('editUserNickName', () => {
        let user;
        let input;
        it('returns modified nick name of the specific user', async () => {
            user = 'gibong';
            input = 'bongbongg'
            const userNickName = await userStore.editUserNickName(user, input);
            expect(userNickName).toBe(input);
        })
    })

    describe('editUserIntroductory', () => {
        let user;
        let input;
        it('returns modified introductory of the specific user', async () => {
            user = 'gibong';
            input = 'introducing bongbong'
            const userIntroductory = await userStore.editUserIntroductory(user, input);
            expect(userIntroductory).toBe(input);
        })
    })

    describe('editUserImage', () => {
        let user;
        let input;
        it('returns modified image of the specific user', async () => {
            input = 'http2'
            user = {
                user: 'gibong',
                imageUrl: input
            };
            const userInfo = await userStore.editUserImage(user, input);
            expect(userInfo.userURL).toBe(input);
        })
    })

    describe('createUser', () => {
        let id;
        let pwd;
        let createdUser;
        it('returns created user using input id and pwd based on userSchemaModel', async () => {
            id = 'gibong';
            pwd = 'whatever';
            createdUser = {
                userFollow: ['Bongstagram'],
                scrap: [],
                name: 'gibong',
                userURL: 'http://localhost:3000/static/images/profilepicture.png',
                password: 'whatever',
                nickName: '',
                introductory: '',
                __v: 0
            }
            const newUser = await userStore.createUser(id, pwd);
            expect(newUser.userFollow).toEqual(expect.arrayContaining(createdUser.userFollow))
            expect(newUser.scrap).toEqual(expect.arrayContaining(createdUser.scrap))
            expect(newUser.name).toBe(createdUser.name)
            expect(newUser.userURL).toBe(createdUser.userURL)
            expect(newUser.password).toBe(createdUser.password)
            expect(newUser.nickName).toBe(createdUser.nickName)
            expect(newUser.introductory).toBe(createdUser.introductory)

        })
    })


})