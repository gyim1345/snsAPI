import { db } from '../../index';
import postingStore from '../../repository/postingStore';
import postSchemaModel from '../../model/post';
import userStore from '../../repository/userStore'

describe('postingStore', () => {
    let postModel;
    let posting;
    
    beforeEach(async () => {
        await db.dropDatabase();
        postModel =  new postSchemaModel();
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
            const postList = await postingStore.getUserPostsLength(name);
            expect(postList).toBe(1);
        })
    });

    describe('getUserPosts', () => {
        let name;
        it('returns posts of the user', async () => {
            name = 'gibong@gmail.com'
            const posts = await postingStore.getUserPosts(name);
            expect(posts[0].userName).toBe(name);
            expect(posts[0].title).toBe(posting[0].title)
            expect(posts[0].imageUrl).toBe(posting[0].imageUrl)
            expect(posts[0].id).toBe(posting[0].id)
            expect(posts[0].like).toEqual(expect.arrayContaining(posting[0].like))
            expect(posts[0].tag).toEqual(expect.arrayContaining(posting[0].tag))
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
            expect(posts[0].userName).toBe(posting[0].userName);
            expect(posts[0].title).toBe(posting[0].title)
            expect(posts[0].imageUrl).toBe(posting[0].imageUrl)
            expect(posts[0].id).toBe(posting[0].id)
            expect(posts[0].like).toEqual(expect.arrayContaining(posting[0].like))
            expect(posts[0].tag).toEqual(expect.arrayContaining(posting[0].tag))
        })
    })

    describe('getUserTaggedPosts', () => {
        it('returns posts matching the array of ids', async () => {
            const posts = await postingStore.getUserTaggedPosts('gibong@gmail.com');
            expect(posts[0].userName).toBe(posting[0].userName);
            expect(posts[0].title).toBe(posting[0].title)
            expect(posts[0].imageUrl).toBe(posting[0].imageUrl)
            expect(posts[0].id).toBe(posting[0].id)
            expect(posts[0].like).toEqual(expect.arrayContaining(posting[0].like))
            expect(posts[0].tag).toEqual(expect.arrayContaining(posting[0].tag))
        })
    })

    describe('changeLike', () => {

        describe('when clicked odd time', () => {
            let id = 3;
            it('returns post with userName added to like property', async () => {
                const post = await postingStore.changeLike( { id }, 'gibong@gmail.com');
                expect(post.like).toEqual(expect.arrayContaining([...posting[0].like, 'gibong@gmail.com']));
            })
        })

        describe('when clicked even time', () => {
            let id = 3;
            posting =[{
                id: 3,
                title: 'eeeeeee',
                imageUrl: 'htttp',
                userName: 'gibong@gmail.com',
                like: ['eeeeeee', 'gibong@gmail.com'],
                tag: ['gibong@gmail.com']
            }]

            it('returns post with userName removed from like property', async () => {
                const post = await postingStore.changeLike( { id }, 'gibong@gmail.com');
                expect(post.like).toEqual(expect.arrayContaining(['eeeeeee']));
            })
        })
    })

    
    describe('getuserTimeLinePosts', () => {

        beforeEach(() => {
            userStore.getFollowerFromUser = jest.fn().mockResolvedValue('eeee')
            postingStore.getuserPosts = jest.fn().mockResolvedValue([{
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
            }])
        })
        it('returns posts with followers posts and users posts', async () => {
            const posts = await postingStore.getuserTimeLinePosts('gibong@gmail.com');
            expect(posts[1].userName).toBe('eeee');
        })
    })

    describe('editPostTitle', () => {
        let title;
        let post ={
            id: 3,
            title: 'eeeeeee',
            imageUrl: 'htttp',
            userName: 'gibong@gmail.com',
            like: ['eeeeeee', 'gibong@gmail.com'],
            tag: ['gibong@gmail.com']
        }
        it('returns post with title edited', async () => {
            title ='asd'
            const editedPost = await postingStore.editPostTitle(title, post);
            expect(editedPost.title).toBe(title)
        })
    })

    describe('createPost', () => {
        let title;
        let url;
        let name;
        let inputTag;
        describe('given title, url, name, inputTag by input', () => {
        it('returns created post', async () => {
            title = 'title';
            url = 'localwhatever/asd';
            name = 'gibong@gmail.com';
            inputTag = 'asd'
            const createdPost = {
                id: 444,
                title: title,
                imageUrl: url,
                userName: 'gibong@gmail.com',
                like: [],
                tag: [inputTag],
              }
            const newPost = await postingStore.createPost(title, name, url, inputTag);
            expect(typeof newPost.id).toBe('number');
            expect(newPost.title).toEqual(createdPost.title);
            expect(newPost.imgaeUrl).toBe(createdPost.imgaeUrl);
            expect(newPost.userNmae).toBe(createdPost.userNmae);
            expect(newPost.like).toEqual(expect.arrayContaining(createdPost.like));
            expect(newPost.tag).toEqual(expect.arrayContaining(createdPost.tag));
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