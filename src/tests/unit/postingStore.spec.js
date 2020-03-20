import { db } from '../../index';
import postingStore from '../../repository/postingStore';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';

describe('postingStore', () => {
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
        postModel.userName = 'gibong@gmail.com';
        postModel.like = ['eeeeeee'];
        postModel.tag = ['gibong@gmail.com'];
        await postModel.save();

        posting =[{
            id: 3,
            title: 'eeeeeee',
            imageUrl: 'htttp',
            userName: 'gibong@gmail.com',
            like: ['eeeeeee'],
            tag: ['gibong@gmail.com']
        }]
        
        userModel = new userSchemaModel();
        userModel.name = 'gibong@gmail.com';
        userModel.userId = 33;
        userModel.userFollow = ['eeee'];
        userModel.userURL = 'http';
        userModel.password = 'pwd';
        userModel.scrap = [1,3,5];
        userModel.nickName = 'nicknamee';
        userModel.introductory = 'wtf';
        await userModel.save();

        userInfo = {
            name: 'gibong@gmail.com',
            userId: 33,
            userFollow: ['eeee'],
            userURL: 'http',
            password: 'pwd',
            scrap: [1,3,5],
            nickName: 'nicknamee',
            introductory: 'wtf'
        }
    })

    afterAll(async () => {
        await db.close();
    });

    describe('postList', () => {
        it('returns list of users', async () => {
            const postList = await postingStore.postList();
            expect(postList).toBeDefined();
        })
    });

    describe('postsLength', () => {
        it('return length of all posts in db', async () => {
            const postList = await postingStore.postsLength();
            expect(postList).toBeDefined();
        })
    });

    describe('postForTag', () => {
        let tag;
        it('returns post including the given tag', async () => {
            tag = 'gibong@gmail.com'
            const [postList] = await postingStore.postForTag(tag);
            expect(postList.tag).toEqual(expect.arrayContaining([tag]));
        })
    });

    describe('getuserPosts', () => {
        let name;
        it('returns posts of user', async () => {
            name = 'gibong@gmail.com'
            const [postList] = await postingStore.getuserPosts(name);
            expect(postList.userName).toBe(name);
        })
    });

    describe('getUserPostsLength', () => {
        let name;
        it('returns length of user list', async () => {
            name = 'gibong@gmail.com'
            const postList = await postingStore.getuserPosts(name);
            expect(postList.length).toBe();
        })
    });


})