import { db } from '../../index';
import commentStore from '../../repository/commentStore';
import commentSchemaModel from '../../model/comment';

describe('commentStore', () => {
    let comment = {
        id: 1414,
        postLId: 3,
        title: 'commentTitle',
        userName: 'gibong@gmail.com',
        like: [],
        isUnder: undefined,
    }

    beforeEach(async () => {
        await db.dropDatabase();

        await commentSchemaModel.create(comment)
    })

    afterAll(async () => {
        await db.dropDatabase();

        await db.close();
    });

    describe('commentList', () => {
        it('returns all comments', async () => {
            const comments = await commentStore.commentList();
            expect(comments).toBeDefined();
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
            const commentOfPost = await commentStore.getCommentFromPostId(comment.postLId);
            expect(commentOfPost[0].id).toBe(1414);
            expect(commentOfPost[0].postLId).toBe(3);
            expect(commentOfPost[0].title).toBe('commentTitle');
            expect(commentOfPost[0].userName).toBe('gibong@gmail.com');
            expect(commentOfPost[0].like).toEqual(expect.arrayContaining([]));
            expect(commentOfPost[0].isUnder).toBe(undefined);
            // expect(commentOfPost[0]).toEqual(expect.objectContaining(comment))
            // expect(commentOfPost[0]).toEqual(
            //     expect.objectContaining({
            //         id: 1414,
            //         postLId: 3,
            //         title: 'commentTitle',
            //         userName: 'gibong@gmail.com',
            //         like: expect.arrayContaining([]),
            //         isUnder: undefined
            //     })
            // )

        })
    })

    describe('getComment', () => {
        it('returns the comment corresponding to the id', async () => {
            let commentFoundById = await commentStore.getComment(comment.id);
            expect(commentFoundById.id).toBe(1414);
            expect(commentFoundById.postLId).toBe(3);
            expect(commentFoundById.title).toBe('commentTitle');
            expect(commentFoundById.userName).toBe('gibong@gmail.com');
            expect(commentFoundById.like).toEqual(expect.arrayContaining([]));
            expect(commentFoundById.isUnder).toBe(undefined);
        })
    })

    describe('editCommentTitle', () => {
        it('edits title of comment', async () => {
            const editedComment = await commentStore.editCommentTitle(comment.id, 'editedTitle');
            expect(editedComment.title).toBe('editedTitle')
        })
    })

    describe('createComment', () => {
        it('creates new comment', async () => {
            const id = 12414;
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
        it('removes comment', async () => {
            const status = await commentStore.removeComment(comment)
            expect(status).toEqual(expect.objectContaining({ ok: 1 }))
        })
    })

})