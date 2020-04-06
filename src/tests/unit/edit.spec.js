import edit from '../../services/edit';
import postingStore from '../../repository/postingStore';
import commentStore from '../../repository/commentStore';

describe('edit', () => {
    let userName = 'username';
    let post = {
        id: 2,
        title: 'testTitle',
        imageUrl: 'http://localhost:3000/test',
        userName: userName,
        like: ['test'],
        tag: ['test'],
    }
    let posts = [
        post,
        {
            id: 1,
            postLId: 1,
            title: 'title',
            userName: userName,
            like: ['test'],
            isUnder: 2
        }
    ];

    let comment =
    {
        id: 1,
        postLId: 1,
        title: 'newtitle',
        userName: userName,
        like: ['test'],
        isUnder: 1
    }

    describe('checkOwnershipOfPost', () => {

        describe('with ownership', () => {

            it('returns false', async () => {
                const hasOwnership = edit.checkOwnershipOfPost(post, userName)

                expect(hasOwnership).toBe(false)
            });
        });

        describe('without ownership', () => {
            beforeEach(() => {
                userName = 'OTHER'
            });

            it('returns true', async () => {
                const hasOwnership = edit.checkOwnershipOfPost(post, userName)

                expect(hasOwnership).toBe(true)
            })
        });
    });

    describe('editPost', () => {
        let title;

        beforeEach(() => {
            title = 'newInput';
            postingStore.editPostTitle = jest.fn().mockResolvedValue(post)
        })

        it('returns post with title modified to input', async () => {
            const [posts] = await edit.editPost(title, post);

            expect(posts.title).toBe(title)
        })
    })

    describe('editComment', () => {
        let title;
        let commentId;
        let indexOfComment;

        beforeEach(() => {
            commentId = 2;
            indexOfComment = 0;

            commentStore.editCommentTitle = jest.fn().mockResolvedValue(comment)
        })

        it('returns posts including the comment with title modified to title', async () => {
            const editedPosts = await edit.editComment(title, posts, indexOfComment);

            expect(editedPosts[indexOfComment].title).toBe(title)
        })
    })

    describe('checkIfPostOrComment', () => {
        let indexOfComment;

        describe('when it is post', () => {
            it('returns true ', async () => {
                const response = await edit.checkIfPostOrComment(indexOfComment)

                expect(response).toBe(true)
            })
        })
        describe('when it is comment', () => {
            it('returns false', async () => {
                indexOfComment = 1;

                const response = await edit.checkIfPostOrComment(indexOfComment)

                expect(response).toBe(false)
            })
        })
    })

    describe('editThis', () => {
        let title;
        let indexOfComment;

        beforeEach(() => {
            title = 'title of whatever';

            edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(true)
        })

        describe('with ownership', () => {

            beforeEach(() => {
                title = 'title'

                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
                edit.checkIfPostOrComment = jest.fn().mockResolvedValue(true)
                edit.editPost = jest.fn().mockResolvedValue(post = { title: title })
            })

            describe('when it is a post', () => {
                it('returns post with edited title changed to given title', async () => {
                    const response = await edit.editThis(title, post, userName, indexOfComment)

                    expect(response.title).toBe(title)
                })
            })
            describe('when it is a comment', () => {
                beforeEach(() => {
                    indexOfComment = 1;

                    edit.checkIfPostOrComment = jest.fn().mockResolvedValue(false)
                    edit.editComment = jest.fn().mockResolvedValue(posts)
                })

                it('returns posts with edited title changed to given title', async () => {
                    const response = await edit.editThis(title, posts, userName, indexOfComment)

                    expect(response[indexOfComment].title).toBe(title)
                })
            })
        })

        describe('without ownership', () => {
            it('returns { Message: you dont have permission, owned: false }', async () => {
                const response = await edit.editThis(title, post, userName, indexOfComment)

                expect(response).toEqual(expect.objectContaining({ Message: "you don't have permission", owned: false }))
            })
        })
    })
})
