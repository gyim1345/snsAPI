import { db } from '../../app';
import commentStore from '../../repository/commentStore.repository';
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

    let createdComment = {
        id: 1414,
        postLId: 3,
        title: 'commentTitle',
        userName: 'gibong@gmail.com',
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

            expect(commentOfPost[0]).toEqual(expect.objectContaining(createdComment))
        })
    })

    describe('getComment', () => {
        it('returns the comment corresponding to the id', async () => {
            let commentFoundById = await commentStore.getComment(comment.id);

            expect(commentFoundById).toEqual(expect.objectContaining(createdComment))
        })
    })

    describe('editCommentTitle', () => {
        it('edits title of comment', async () => {
            const editedComment = await commentStore.editCommentTitle('editedTitle', comment.id);

            expect(editedComment).toBe(undefined)
        })
    })

    describe('createComment', () => {
        it('creates new comment', async () => {
            const id = 12414;
            const postLId = 5;
            const title = 'newComment';
            const userName = 'gibong@gmail.com';

            const createdComment = {
                postLId: postLId,
                title: title,
                userName: userName,
                replyToCommentId: id
            }

            const newComment = await commentStore.createComment(postLId, title, userName, id);

            expect(newComment).toEqual(expect.objectContaining(createdComment))
        })
    })

    describe('removeComment', () => {
        it('removes comment', async () => {
            const status = await commentStore.removeComment(comment.id)
            expect(status).toEqual(expect.objectContaining({ ok: 1 }))
        })
    })

    describe('createAndReturnCommentsOfTheSpecificId', () => {
        let newComment;

        beforeEach(() => {
            newComment = {
                postLId: 10,
                title: 'today i learned',
                userName: 'gibong@gmail.com',
                replyToCommentId: 4
            }
        })

        it('returns comment', async () => {
            const comments = await commentStore.createAndReturnCommentsOfTheSpecificId(newComment.postLId, newComment.title, newComment.userName, newComment.replyToCommentId)
            expect(comments[0]).toEqual(expect.objectContaining(newComment))
        })
    })

})