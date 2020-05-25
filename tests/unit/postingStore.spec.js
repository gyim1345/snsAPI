import { db } from '../../app';
import postingStore from '../../repository/postingStore.repository';
import postSchemaModel from '../../model/post';
import userSchemaModel from '../../model/user';
import userStore from '../../repository/userStore.repository'

describe('postingStore', () => {

    
    let userName = 'gibong@gmail.com'
    let posting = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttp',
        userName: userName,
        like: ['eeeeeee'],
        tag: [userName]
    }]
    let posts = [{
        id: 3,
        title: 'eeeeeee',
        imageUrl: 'htttp',
        userName: 'gibong@gmail.com',
        like: ['eeeeeee'],
        tag: ['gibong@gmail.com']
    },
    {
        id: 4,
        title: 'eeeeeee',
        imageUrl: 'htttp',
        userName: 'eeee',
        like: ['eeeeeee', 'gibong@gmail.com'],
        tag: ['gibong@gmail.com']
    }]

    let createdPost = [
        {
          id: 3,
          title: 'eeeeeee',
          imageUrl: 'htttp',
          userName: 'gibong@gmail.com',
        }
      ]

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

    beforeEach(async () => {
        await db.dropDatabase();

        await userSchemaModel.create(userInfo);
        await postSchemaModel.create(posting);
    })

    afterAll(async () => {
        await db.dropDatabase();

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
      
            expect(postList).toBe(1);
        })
    });

    describe('postForTag', () => {
        it('returns post including the given tag', async () => {
            const [postList] = await postingStore.postForTag(userName);
       
            expect(postList.tag).toEqual(expect.arrayContaining([userName]));
        })
    });

    describe('getuserPosts', () => {
        it('returns posts of user', async () => {
            const [postList] = await postingStore.getuserPosts(userName);
       
            expect(postList.userName).toBe(userName);
        })
    });

    describe('getUserPostsLength', () => {
        it('returns length of user list', async () => {
            const postList = await postingStore.getUserPostsLength(userName);
           
            expect(postList).toBe(1);
        })
    });

    describe('getUserPosts', () => {

        
        it('returns posts of the user', async () => {
            const posts = await postingStore.getUserPosts(userName);

            expect(posts[0]).toEqual(expect.objectContaining(createdPost[0]))
        })
    })

    describe('getPost', () => {
        let id;
        it('returns post of the id', async () => {
            id = 3
            const posts = await postingStore.getPost(id);
           
            expect(posts[0].id).toBe(posting[0].id);
        })
    })

    describe('getPostsFromArrayId', () => {

        
        it('returns posts matching the array of ids', async () => {
            const posts = await postingStore.getPostsFromArrayId([3]);
            
            expect(posts[0]).toEqual(expect.objectContaining(createdPost[0]))
        })
    })

    describe('getUserTaggedPosts', () => {

        it('returns posts matching the array of ids', async () => {
            const posts = await postingStore.getUserTaggedPosts('gibong@gmail.com');

            expect(posts[0]).toEqual(expect.objectContaining(createdPost[0]))
        })
    })

    describe('changeLike', () => {

        describe('when clicked odd time', () => {
            let id = 3;

            it('returns post with userName added to like property', async () => {
                
                const post = await postingStore.changeLike( id , userName);
                expect(post.like).toEqual(expect.arrayContaining([...posting[0].like, userName]));
            })
        })

        describe('when clicked even time', () => {
            let id = 3;

            beforeEach(async() => {
                posting[0].like.push(userName)

                const post = await postSchemaModel.findOne({ id: id })
                post.like =[...post.like, userName]
                await post.save();
            })

            it('returns post with userName removed from like property', async () => {
                const post = await postingStore.changeLike( id , userName);
                expect(post.like).toEqual(expect.not.arrayContaining([userName]));
            })
        })
    })


    describe('getuserTimeLinePosts', () => {

        beforeEach(() => {
            userStore.getFollowerFromUser = jest.fn().mockResolvedValue('eeee')
            postingStore.getuserPosts = jest.fn().mockResolvedValue(posts)
        })
        it('returns posts with followers posts and users posts', async () => {
            const posts = await postingStore.getuserTimeLinePosts(userName);
            expect(posts[1].userName).toBe('eeee');
        })
    })

    describe('editPostTitle', () => {
        let title;

        it('returns post with title edited', async () => {
            title = 'asd'
            const editedPost = await postingStore.editPostTitle(title, posting[0]);
            expect(editedPost.title).toBe(title)
        })
    })

    describe('createPost', () => {
        let title;
        let url;
        let inputTag;
        describe('given title, url, name, inputTag by input', () => {
            beforeEach(()=> {

                title = 'title';
                url = 'localwhatever/asd';
                inputTag = 'asd'
                createdPost = {
                    title: title,
                    imageUrl: url,
                    userName: userName,
                }
            })

            it('returns created post', async () => {
                let newPost = await postingStore.createPost(title, userName, url, inputTag);
                console.log(newPost)
                expect(newPost).toEqual(expect.objectContaining(createdPost))
            })
        })
    })

    describe('removePost', () => {
        it('removes post', async () => {
            const removedPostList = await postingStore.removePost(3);
            expect(removedPostList).toEqual(expect.not.objectContaining(posting[0])
            );
        })
    })

})