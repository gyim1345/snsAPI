import { db } from '../../index';
import commentStore from '../../repository/commentStore';
import commentSchemaModel from '../../model/comment';


describe('commentStore', () => {
    let commentModel;
    let comment;

    beforeEach(async () => {
        await db.dropDatabase();
        commentModel = new commentSchemaModel();
        commentModel.id = 1414;
        commentModel.postLId = 3;
        commentModel.title = 'commentTitle';
        commentModel.userName = 'gibong@gmail.com';
        commentModel.like = [];
        commentModel.isUnder = undefined;
        await commentModel.save();

        comment = {
            id: 1414,
            postLId: 3,
            title: 'commentTitle',
            userName: 'gibong@gmail.com',
            like: [],
            isUnder: undefined,
        }
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('commentList', () => {
        it('returns all comment', async () => {
            const commentList = await commentStore.commentList();
            expect(commentList).toBeDefined();
        })
    })

    describe('commentsLength', () => {
        it('returns length of all comments stored in db', async () => {
            const commentListLength = await commentStore.commentsLength();
            expect(commentListLength).toBe(1);
        })
    })

    describe('getCommentFromPostId', () => {
        it('returns comment of the specific post Id', async () => {
            const commentOfPost = await commentStore.getCommentFromPostId(3);
            // expect(commentOfPost[0]).toEqual(expect.objectContaining(comment))
            expect(commentOfPost[0]).toEqual(
                expect.objectContaining({
                    id: 1414,
                    postLId: 3,
                    title: 'commentTitle',
                    userName: 'gibong@gmail.com',
                    like: expect.arrayContaining([]),
                    isUnder: undefined
                })
            )
        })
    })

    describe('getComment', () => {
        it('returns the comment corresponding to the id', async () => {
            let commentFoundById = await commentStore.getComment(1414);
            expect(commentFoundById).toEqual(
                expect.objectContaining({
                    id: 1414,
                    postLId: 3,
                    title: 'commentTitle',
                    userName: 'gibong@gmail.com',
                    like: expect.arrayContaining([]),
                    isUnder: undefined
                })
            )
        })
    })
    
    describe('editCommentTitle', () => {
        it('edits title of comment', async() => {
            const editedComment = await commentStore.editCommentTitle(1414, 'editedTitle');
            expect(editedComment.title).toBe('editedTitle')
        })
    })

    describe('createComment', () => {
        it('creates new comment', async()=> {
             const id =12414;
             const postLId = 5;
             const title = 'newComment';
             const userName = 'gibong@gmail.com';

            const newComment = await commentStore.createComment(postLId, title, userName, id);
            expect(typeof newComment.id).toBe('number');
            expect(newComment.postLId).toBe(5);
            expect(newComment.title).toBe('newComment');
            expect(newComment.userName).toBe('gibong@gmail.com');
            expect(newComment.like).toEqual(expect.arrayContaining([]));
            expect(newComment.isUnder).toBe(12414);

        })
    })

    describe('removeComment', () => {
        it('removes comment', async() => {
            const comments = await commentStore.removeComment(comment)
            expect(comments).toEqual(expect.not.objectContaining(comment))
        })
        })

})