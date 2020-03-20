import edit from '../../services/edit';
import postingStore from '../../repository/postingStore';
import commentStore from '../../repository/commentStore';

describe('edit', () => {
    let userName;
    let post;
    // TODO: userName 을 userName으로 바꿀것
    describe('checkOwnershipOfPost', () => {
        beforeEach(() => {
            userName = 'username';

            post = {
                id: 2,
                title: 'testTitle',
                imageUrl: 'http://localhost:3000/test',
                userName: userName,
                like: ['test'],
                tag: ['test'],
            }
        })

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
        //TODO: input 을 다 title 로 바꾸기
        beforeEach(() => {
            title = 'newInput';
            postingStore.editPostTitle = jest.fn().mockResolvedValue(
                post =
                {
                    id: 2,
                    title: title,
                    imageUrl: 'http://localhost:3000/test',
                    userName: userName,
                    like: ['test'],
                    tag: ['test'],
                }
            )
        })
        //question describe로 빼서 with title modified to input => it returns post 라고 하면 문맥상 이상함 그래도 바꿔도 되는지??
        it('returns post with title modified to input', async () => {
            const [posts] = await edit.editPost(title, post);
            expect(posts.title).toBe(title)
        })
    })

    describe('editComment', () => {
        let title;
        let commentId;
        let indexOfComment;
        let comment;
        beforeEach(() => {
            title = 'newtitle';
            commentId = 2;
            indexOfComment = 0;
            post = [{
                id: 2,
                postLId: 1,
                title: title,
                userName: userName,
                like: ['test'],
                isUnder: 1
            },
            {
                id: 1,
                postLId: 1,
                title: title,
                userName: userName,
                like: ['test'],
                isUnder: 2
            }
            ];
            commentStore.editCommentTitle = jest.fn().mockResolvedValue(
                comment =
                {
                    id: commentId,
                    postLId: 1,
                    title: title,
                    userName: userName,
                    like: ['test'],
                    isUnder: 1
                }
            )
        })

        it('returns posts including the comment with title modified to title', async () => {
            const posts = await edit.editComment(title, post, indexOfComment);
            expect(posts[indexOfComment].title).toBe(title)
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
                edit.checkOwnershipOfPost = jest.fn().mockResolvedValue(false)
            })
            describe('when it is a post', () => {
                it('returns post with edited title changed to given title', async () => {
                    edit.checkIfPostOrComment = jest.fn().mockResolvedValue(true)
                    edit.editPost = jest.fn().mockResolvedValue(
                        post = {
                            id: '2',
                            title: title,
                            imageUrl: 'http://localhost:3000/test',
                            userName: userName,
                            like: ['test'],
                            tag: ['test'],
                        })

                    const response = await edit.editThis(title, post, userName, indexOfComment)
                    expect(response.title).toBe(title)
                })
            })
            describe('when it is a comment', () => {
                it('returns posts with edited title changed to given title', async () => {
                    indexOfComment = 1;
                    post = [{
                        id: 2,
                        postLId: 1,
                        title: title,
                        userName: userName,
                        like: ['test'],
                        isUnder: 1
                    },
                    {
                        id: 1,
                        postLId: 1,
                        title: title,
                        userName: userName,
                        like: ['test'],
                        isUnder: 2
                    }
                    ];
                    edit.checkIfPostOrComment = jest.fn().mockResolvedValue(false)
                    edit.editComment = jest.fn().mockResolvedValue(
                        post = [{
                            id: 2,
                            postLId: 1,
                            title: title,
                            userName: userName,
                            like: ['test'],
                            isUnder: 1
                        },
                        {
                            id: 1,
                            postLId: 1,
                            title: title,
                            userName: userName,
                            like: ['test'],
                            isUnder: 2
                        }]
                    )

                    const response = await edit.editThis(title, post, userName, indexOfComment)
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
